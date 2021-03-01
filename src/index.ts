'use strict'

import * as _ from 'ramda'
import {
  HandleErrorFunction,
  NewTimestampFunction,
  SnowflakeOptions,
  ClockBackFunction,
  ValidateIdFunction,
  GenerateIdFunction,
  TimestampEqualFunction,
  IsNextMillisecondFunction,
  NextMillisecondFunction,
  SnowflakeFunction
} from './interface'

export const snowflake: SnowflakeFunction = ({
  twEpoch,
  dataCenterId = 0,
  workerId = 0
}: SnowflakeOptions) => {
  const epoch = BigInt(twEpoch)
  const dataCenterNode = BigInt(dataCenterId)
  const workerNode = BigInt(workerId)

  const sequenceBit = 12n
  const workerBit = 5n
  const dataCenterBit = 5n

  const maxDataCenterId = -1n ^ (-1n << dataCenterBit)
  const maxWorkerId = -1n ^ (-1n << workerBit)
  const maxSequence = -1n ^ (-1n << sequenceBit)

  const workerLeftShift = sequenceBit
  const dataCenterLeftShift = sequenceBit + workerBit
  const timestampLeftShift = dataCenterLeftShift + dataCenterBit

  let sequence = 0n
  let lastTimestamp = -1n

  const validateOptions = _.compose(handleError, validateId)

  validateOptions({
    id: dataCenterNode,
    maxId: maxDataCenterId,
    errorMessage:
      'Data center id can not be greater than ${maxId} or less than 0.'
  })

  validateOptions({
    id: workerNode,
    maxId: maxWorkerId,
    errorMessage: 'Worker id can not be greater than ${maxId} or less than 0.'
  })

  return () => {
    const timestamp = newTimestamp()
    const checkTimestamp = _.curry(clockBack)(timestamp)
    const newId = _.curry(generateId)({
      twEpoch: epoch,
      timestampLeftShift,
      dataCenterId: dataCenterNode,
      dataCenterLeftShift,
      workerId: workerNode,
      workerLeftShift
    })

    _.compose(handleError, checkTimestamp)(lastTimestamp)

    const {
      id,
      lastTimestamp: newLastTimestamp,
      sequence: newSequence
    } = _.compose(
      newId,
      timestampEqual
    )({ timestamp, lastTimestamp, sequence, maxSequence })

    lastTimestamp = newLastTimestamp
    sequence = newSequence

    return id.toString()
  }
}

export const validateId: ValidateIdFunction = ({ id, maxId, errorMessage }) =>
  id > maxId || id < 0
    ? _.replace('${maxId}', `${maxId}`, errorMessage)
    : undefined

export const clockBack: ClockBackFunction = (timestamp, lastTimestamp) =>
  timestamp < lastTimestamp
    ? `Clock moves backwards to reject the id generated for ` +
      `${lastTimestamp - timestamp}.`
    : undefined

export const timestampEqual: TimestampEqualFunction = ({
  timestamp,
  lastTimestamp,
  ...args
}) =>
  timestamp === lastTimestamp
    ? isNextMillisecond({ timestamp, lastTimestamp, ...args })
    : { timestamp, sequence: 0n }

export const isNextMillisecond: IsNextMillisecondFunction = ({
  timestamp,
  lastTimestamp,
  sequence,
  maxSequence
}) => {
  sequence = (sequence + 1n) & maxSequence

  return sequence === 0n
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

export const newTimestamp: NewTimestampFunction = () => BigInt(Date.now())
export const handleError: HandleErrorFunction = (message) => {
  if (message) {
    throw new Error(message)
  }
}
