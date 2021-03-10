'use strict'

import { flow } from 'lodash/fp'
import {
  GenerateIdFunction,
  GetNextMillisecondFunction,
  GetTimestampFunction,
  HandleClockBackFunction,
  HandleErrorFunction,
  HandleTimestampEqualFunction,
  NextMillisecondFunction,
  SnowflakeFunction,
  ValidateIdFunction
} from './interface'

export const snowflake: SnowflakeFunction = ({
  twEpoch,
  dataCenterId = 0,
  machineId = 0
}) => {
  const epoch = BigInt(twEpoch)
  const dataCenterNode = BigInt(dataCenterId)
  const machineNode = BigInt(machineId)

  const sequenceBit = 12n
  const workerBit = 5n
  const dataCenterBit = 5n

  const maxDataCenterId = -1n ^ (-1n << dataCenterBit)
  const maxMachineId = -1n ^ (-1n << workerBit)
  const maxSequence = -1n ^ (-1n << sequenceBit)

  const machineLeftShift = sequenceBit
  const dataCenterLeftShift = sequenceBit + workerBit
  const timestampLeftShift = dataCenterLeftShift + dataCenterBit

  let sequence = 0n
  let lastTimestamp = -1n

  const validateItems = [
    {
      id: dataCenterNode,
      maxId: maxDataCenterId,
      errorMessage:
        'The data center id cannot be greater than ${maxId} or less than 0.'
    },
    {
      id: machineNode,
      maxId: maxMachineId,
      errorMessage:
        'The machine id cannot be greater than ${maxId} or less than 0.'
    }
  ]

  const validate = flow(validateId, handleError)

  validateItems.forEach(validate)

  return () => {
    const timestamp = getTimestamp()
    const checkTimestamp = handleClockBack(timestamp)
    const nextId = generateId({
      twEpoch: epoch,
      timestampLeftShift,
      dataCenterId: dataCenterNode,
      dataCenterLeftShift,
      machineId: machineNode,
      machineLeftShift
    })

    flow(checkTimestamp, handleError)(lastTimestamp)

    const { id, lastTimestamp: newLastTimestamp, sequence: newSequence } = flow(
      handleTimestampEqual,
      nextId
    )({ timestamp, lastTimestamp, sequence, maxSequence })

    lastTimestamp = newLastTimestamp
    sequence = newSequence

    return id.toString()
  }
}

export const validateId: ValidateIdFunction = ({ id, maxId, errorMessage }) => {
  const errorId = id > maxId || id < 0

  if (errorId) {
    return errorMessage.replace('${maxId}', maxId.toString())
  }
}

export const handleClockBack: HandleClockBackFunction = (timestamp) => (
  lastTimestamp
) => {
  if (timestamp < lastTimestamp) {
    return (
      `The clock moves backwards and rejects the id generated for ` +
      `${lastTimestamp - timestamp}.`
    )
  }
}

export const handleTimestampEqual: HandleTimestampEqualFunction = ({
  timestamp,
  lastTimestamp,
  ...args
}) =>
  timestamp === lastTimestamp
    ? nextMillisecond({ timestamp, lastTimestamp, ...args })
    : { timestamp, sequence: 0n }

export const nextMillisecond: NextMillisecondFunction = ({
  timestamp,
  lastTimestamp,
  sequence,
  maxSequence
}) => {
  const nextSequence = (sequence + 1n) & maxSequence

  return nextSequence === 0n
    ? {
        timestamp: getNextMillisecond(timestamp, lastTimestamp),
        sequence: nextSequence
      }
    : { timestamp, sequence: nextSequence }
}

export const getNextMillisecond: GetNextMillisecondFunction = (
  timestamp,
  lastTimestamp
) =>
  timestamp <= lastTimestamp
    ? getNextMillisecond(getTimestamp(), lastTimestamp)
    : timestamp

export const generateId: GenerateIdFunction = ({
  twEpoch,
  timestampLeftShift,
  dataCenterId,
  dataCenterLeftShift,
  machineId,
  machineLeftShift
}) => ({ timestamp, sequence }) => ({
  id:
    ((timestamp - twEpoch) << timestampLeftShift) |
    (dataCenterId << dataCenterLeftShift) |
    (machineId << machineLeftShift) |
    sequence,
  lastTimestamp: timestamp,
  sequence
})

export const getTimestamp: GetTimestampFunction = () => BigInt(Date.now())
export const handleError: HandleErrorFunction = (message) => {
  if (message) {
    throw new Error(message)
  }
}
