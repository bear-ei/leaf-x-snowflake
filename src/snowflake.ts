'use strict'

import { compose, curry, replace } from 'ramda'
import {
  HandleErrorFunction,
  NextMillisecondFunction,
  SnowflakeFunction,
  TimeDiffFunction,
  ValidateIdFunction,
  TimeEqualFunction,
  GenerateIdFunction,
  IsNextMillisecondFunction,
  NewTimestampFunction
} from './interface/snowflake'

export const snowflake: SnowflakeFunction = ({
  twEpoch,
  dataCenterId = 0,
  workerId = 0
}) => {
  const epoch = BigInt(twEpoch)
  const dataCenterNode = BigInt(dataCenterId)
  const workerNode = BigInt(workerId)
  const sequenceBit = BigInt(12)
  const workerIdBit = BigInt(5)
  const dataCenterIdBit = BigInt(5)
  const maxDataCenterId = -BigInt(1) ^ (-BigInt(1) << dataCenterIdBit)
  const maxWorkerId = -BigInt(1) ^ (-BigInt(1) << workerIdBit)
  const maxSequence = -BigInt(1) ^ (-BigInt(1) << sequenceBit)
  const workerLeftShift = sequenceBit
  const dataCenterLeftShift = sequenceBit + workerIdBit
  const timestampLeftShift = dataCenterLeftShift + maxDataCenterId
  const impure = { handleError }

  let sequence = BigInt(0)
  let lastTimestamp = -BigInt(1)

  const validate = compose(impure.handleError, validateId)

  validate({
    id: dataCenterNode,
    maxId: maxDataCenterId,
    message: 'Data center id can not be greater than ${maxId} or less than 0.'
  })

  validate({
    id: workerNode,
    maxId: maxWorkerId,
    message: 'Worker id can not be greater than ${maxId} or less than 0.'
  })

  return () => {
    const timestamp = newTimestamp()
    const timeDiffCurry = curry(timeDiff)(timestamp)
    const generateIdCurry = curry(generateId)({
      twEpoch: epoch,
      timestampLeftShift,
      dataCenterId: dataCenterNode,
      dataCenterLeftShift,
      workerId: workerNode,
      workerLeftShift
    })

    const checkTime = compose(impure.handleError, timeDiffCurry)
    const nextId = compose(generateIdCurry, timeEqual)

    checkTime(lastTimestamp)

    const {
      id,
      lastTimestamp: newLastTimestamp,
      sequence: newSequence
    } = nextId({
      timestamp,
      lastTimestamp,
      sequence,
      maxSequence
    })

    lastTimestamp = newLastTimestamp
    sequence = newSequence

    return id.toString()
  }
}

export const validateId: ValidateIdFunction = ({ id, maxId, message }) =>
  id > maxId || id < 0 ? replace('${maxId}', `${maxId}`, message) : undefined

export const timeDiff: TimeDiffFunction = (timestamp, lastTimestamp) =>
  timestamp < lastTimestamp
    ? `Clock moves backwards to reject the id generated for ` +
      `${lastTimestamp - timestamp}.`
    : undefined

export const timeEqual: TimeEqualFunction = ({
  timestamp,
  lastTimestamp,
  ...args
}) =>
  timestamp === lastTimestamp
    ? isNextMillisecond({ timestamp, lastTimestamp, ...args })
    : { timestamp, sequence: BigInt(0) }

export const isNextMillisecond: IsNextMillisecondFunction = ({
  timestamp,
  lastTimestamp,
  sequence,
  maxSequence
}) => {
  sequence = (sequence + BigInt(1)) & maxSequence

  return sequence === BigInt(0)
    ? { timestamp: nextMillisecond(timestamp, lastTimestamp), sequence }
    : { timestamp, sequence }
}

export const nextMillisecond: NextMillisecondFunction = (
  timestamp,
  lastTimestamp
) =>
  timestamp <= lastTimestamp
    ? nextMillisecond(newTimestamp(), lastTimestamp)
    : timestamp

export const newTimestamp: NewTimestampFunction = () => BigInt(Date.now())
export const generateId: GenerateIdFunction = (
  {
    twEpoch,
    timestampLeftShift,
    dataCenterId,
    dataCenterLeftShift,
    workerId,
    workerLeftShift
  },
  { timestamp, sequence }
) => ({
  id:
    ((timestamp - twEpoch) << timestampLeftShift) |
    (dataCenterId << dataCenterLeftShift) |
    (workerId << workerLeftShift) |
    sequence,
  lastTimestamp: timestamp,
  sequence
})

export const handleError: HandleErrorFunction = (message?: string): void => {
  if (message) {
    throw new Error(message)
  }
}
