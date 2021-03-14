import { flow } from 'lodash/fp'
import { handleClockBack } from './clockBack'
import { handleErrorMessage } from './error'
import { generateId } from './generateId'
import { SnowflakeFunction } from './interface/snowflake'
import { getTimestamp, handleTimestampEqual } from './timestamp'
import { validateId } from './validate'

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

  const validate = flow(validateId, handleErrorMessage)

  validateItems.forEach(validate)

  return () => {
    const nextId = generateId({
      twEpoch: epoch,
      timestampLeftShift,
      dataCenterId: dataCenterNode,
      dataCenterLeftShift,
      machineId: machineNode,
      machineLeftShift
    })

    const timestamp = getTimestamp()
    const checkClockBack = handleClockBack(timestamp)

    flow(checkClockBack, handleErrorMessage)(lastTimestamp)

    const { id, lastTimestamp: newLastTimestamp, sequence: newSequence } = flow(
      handleTimestampEqual,
      nextId
    )({ timestamp, lastTimestamp, sequence, maxSequence })

    lastTimestamp = newLastTimestamp
    sequence = newSequence

    return id.toString()
  }
}
