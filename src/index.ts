import { flow } from 'lodash/fp'
import {
  GenerateIdFunction,
  GetNewTimestampFunction,
  GetNextMillisecondFunction,
  HandleClockBackFunction,
  HandleErrorFunction,
  HandleTimestampEqualFunction,
  IsNextMillisecondFunction,
  SnowflakeFunction,
  ValidateIdFunction
} from './interface'
;('use strict')

export const snowflake: SnowflakeFunction = ({ twEpoch, dataCenterId = 0, workerId = 0 }) => {
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

  const validateItems = [
    {
      id: dataCenterNode,
      maxId: maxDataCenterId,
      errorMessage: 'Data center id can not be greater than ${maxId} or less than 0.'
    },
    {
      id: workerNode,
      maxId: maxWorkerId,
      errorMessage: 'Worker id can not be greater than ${maxId} or less than 0.'
    }
  ]

  const validate = flow(validateId, handleError)

  validateItems.forEach(validate)

  return () => {
    const timestamp = getNewTimestamp()
    const checkTimestamp = handleClockBack(timestamp)
    const newId = generateId({
      twEpoch: epoch,
      timestampLeftShift,
      dataCenterId: dataCenterNode,
      dataCenterLeftShift,
      workerId: workerNode,
      workerLeftShift
    })

    flow(checkTimestamp, handleError)(lastTimestamp)

    const { id, lastTimestamp: newLastTimestamp, sequence: newSequence } = flow(
      handleTimestampEqual,
      newId
    )({ timestamp, lastTimestamp, sequence, maxSequence })

    lastTimestamp = newLastTimestamp
    sequence = newSequence

    return id.toString()
  }
}

export const validateId: ValidateIdFunction = ({ id, maxId, errorMessage }) =>
  id > maxId || id < 0 ? errorMessage.replace('${maxId}', maxId.toString()) : undefined

export const handleClockBack: HandleClockBackFunction = (timestamp) => (lastTimestamp) =>
  timestamp < lastTimestamp
    ? `Clock moves backwards to reject the id generated for ${lastTimestamp - timestamp}.`
    : undefined

export const handleTimestampEqual: HandleTimestampEqualFunction = ({ timestamp, lastTimestamp, ...args }) =>
  timestamp === lastTimestamp ? isNextMillisecond({ timestamp, lastTimestamp, ...args }) : { timestamp, sequence: 0n }

export const isNextMillisecond: IsNextMillisecondFunction = ({ timestamp, lastTimestamp, sequence, maxSequence }) => {
  const newSequence = (sequence + 1n) & maxSequence

  return newSequence === 0n
    ? { timestamp: getNextMillisecond(timestamp, lastTimestamp), sequence: newSequence }
    : { timestamp, sequence: newSequence }
}

export const getNextMillisecond: GetNextMillisecondFunction = (timestamp, lastTimestamp) =>
  timestamp <= lastTimestamp ? getNextMillisecond(getNewTimestamp(), lastTimestamp) : timestamp

export const generateId: GenerateIdFunction = ({
  twEpoch,
  timestampLeftShift,
  dataCenterId,
  dataCenterLeftShift,
  workerId,
  workerLeftShift
}) => ({ timestamp, sequence }) => ({
  id:
    ((timestamp - twEpoch) << timestampLeftShift) |
    (dataCenterId << dataCenterLeftShift) |
    (workerId << workerLeftShift) |
    sequence,
  lastTimestamp: timestamp,
  sequence
})

export const getNewTimestamp: GetNewTimestampFunction = () => BigInt(Date.now())
export const handleError: HandleErrorFunction = (message) => {
  if (message) {
    throw new Error(message)
  }
}
