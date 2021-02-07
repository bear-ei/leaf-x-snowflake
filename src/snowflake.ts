'use strict'

import * as _ from 'ramda'
import {
  HandleError,
  NextMillisecond,
  Snowflake,
  TimeDiff,
  ValidateId,
  TimeEqual,
  GenerateId,
  IsNextMillisecond,
  NewTimestamp
} from './interface/snowflake'

export const snowflake: Snowflake = ({
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

  const validate = _.compose(impure.handleError, validateId)

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
    const handleTimeDiff = _.curry(timeDiff)(timestamp)
    const nextId = _.curry(generateId)({
      twEpoch: epoch,
      timestampLeftShift,
      dataCenterId: dataCenterNode,
      dataCenterLeftShift,
      workerId: workerNode,
      workerLeftShift
    })

    _.compose(impure.handleError, handleTimeDiff)(lastTimestamp)

    const {
      id,
      lastTimestamp: newLastTimestamp,
      sequence: newSequence
    } = _.compose(
      nextId,
      timeEqual
    )({ timestamp, lastTimestamp, sequence, maxSequence })

    lastTimestamp = newLastTimestamp
    sequence = newSequence

    return id.toString()
  }
}

export const validateId: ValidateId = ({ id, maxId, message }) =>
  id > maxId || id < 0 ? _.replace('${maxId}', `${maxId}`, message) : undefined

export const timeDiff: TimeDiff = (timestamp, lastTimestamp) =>
  timestamp < lastTimestamp
    ? `Clock moves backwards to reject the id generated for ` +
      `${lastTimestamp - timestamp}.`
    : undefined

export const timeEqual: TimeEqual = ({ timestamp, lastTimestamp, ...args }) =>
  timestamp === lastTimestamp
    ? isNextMillisecond({ timestamp, lastTimestamp, ...args })
    : { timestamp, sequence: BigInt(0) }

export const isNextMillisecond: IsNextMillisecond = ({
  timestamp,
  lastTimestamp,
  sequence,
  maxSequence
}) => {
  sequence = (sequence + BigInt(1)) & maxSequence

  return sequence === BigInt(0)
    ? {
        timestamp: _.curry(nextMillisecond)(timestamp)(lastTimestamp),
        sequence
      }
    : { timestamp, sequence }
}

export const nextMillisecond: NextMillisecond = (timestamp, lastTimestamp) =>
  timestamp <= lastTimestamp
    ? _.curry(nextMillisecond)(newTimestamp())(lastTimestamp)
    : timestamp

export const newTimestamp: NewTimestamp = () => BigInt(Date.now())
export const generateId: GenerateId = (
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

export const handleError: HandleError = (message?: string): void => {
  if (message) {
    throw new Error(message)
  }
}
