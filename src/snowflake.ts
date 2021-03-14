import { flow } from 'lodash/fp'
import { generateId } from './id'
import { SnowflakeFunction } from './interface/snowflake'
import {
  getTimestamp,
  handleClockBack,
  handleTimestampEqual
} from './timestamp'
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

  validateItems.forEach(validateId)

  return () => {
    const timestamp = getTimestamp()
    const checkClockBack = handleClockBack(timestamp)
    const nextId = generateId({
      twEpoch: epoch,
      timestampLeftShift,
      dataCenterId: dataCenterNode,
      dataCenterLeftShift,
      machineId: machineNode,
      machineLeftShift
    })

    const getId = flow(handleTimestampEqual, nextId)

    checkClockBack(lastTimestamp)

    const {
      id,
      lastTimestamp: newLastTimestamp,
      sequence: newSequence
    } = getId({ timestamp, lastTimestamp, sequence, maxSequence })

    lastTimestamp = newLastTimestamp
    sequence = newSequence

    return id.toString()
  }
}
