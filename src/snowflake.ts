'use strict'

import * as _ from 'ramda'
import {
  Snowflake,
  ValidateId,
  TimestampDiff,
  EqualTimestamp,
  IsNextMilliseconds,
  NextMilliseconds,
  NewTimestamp,
  GenerateId,
  HandleError
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

  let sequence = BigInt(0)
  let lastTimestamp = -BigInt(1)

  validateId({
    id: dataCenterNode,
    maxId: maxDataCenterId,
    message: 'Data center id can not be greater than ${maxId} or less than 0.'
  })

  validateId({
    id: workerNode,
    maxId: maxWorkerId,
    message: 'Worker id can not be greater than ${maxId} or less than 0.'
  })

  return () => {
    const timestamp = newTimestamp()
    const equalTimestampCurry = _.curry(equalTimestamp)({
      sequence,
      maxSequence
    })

    const generateIdCurry = _.curry(generateId)({
      twEpoch: epoch,
      timestampLeftShift,
      dataCenterId: dataCenterNode,
      dataCenterLeftShift,
      workerId: workerNode,
      workerLeftShift
    })

    const nextId = _.compose(
      generateIdCurry,
      equalTimestampCurry,
      timestampDiff
    )

    const {
      id,
      lastTimestamp: newLastTimestamp,
      sequence: newSequence
    } = nextId({ timestamp, lastTimestamp })

    lastTimestamp = newLastTimestamp
    sequence = newSequence

    return _.toString(id)
  }
}

export const validateId: ValidateId = ({ id, maxId, message }) => {
  const isErrorId = id > maxId || id < 0

  if (isErrorId) {
    handleError(_.replace('${maxId}', `${maxId}`, message))
  }
}

export const timestampDiff: TimestampDiff = ({ timestamp, lastTimestamp }) => {
  if (timestamp < lastTimestamp) {
    handleError(
      `Clock moves backwards to reject the id generated for ${
        lastTimestamp - timestamp
      }.`
    )
  }

  return { timestamp, lastTimestamp }
}

export const equalTimestamp: EqualTimestamp = (
  sequence,
  { timestamp, lastTimestamp }
) =>
  timestamp === lastTimestamp
    ? isNextMilliseconds(sequence, { timestamp, lastTimestamp })
    : { timestamp, sequence: BigInt(0) }

export const isNextMilliseconds: IsNextMilliseconds = (
  { sequence, maxSequence },
  { timestamp, lastTimestamp }
) => {
  sequence = (sequence + BigInt(1)) & maxSequence

  return {
    timestamp:
      sequence === BigInt(0)
        ? nextMilliseconds({ timestamp, lastTimestamp })
        : timestamp,
    sequence
  }
}

export const nextMilliseconds: NextMilliseconds = ({
  timestamp,
  lastTimestamp
}) =>
  timestamp <= lastTimestamp
    ? nextMilliseconds({ timestamp: newTimestamp(), lastTimestamp })
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

export const handleError: HandleError = (message) => {
  if (message) {
    throw new Error(message)
  }
}
