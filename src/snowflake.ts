import { initGenerateNewId } from './id'
import { Snowflake } from './interface/snowflake.interface'
import {
  getNewTimestamp,
  handleClockCallback,
  handleTimestampEqual
} from './timestamp'
import { validateId } from './validate'

export const snowflake: Snowflake = ({
  twEpoch,
  dataCenterId = 0,
  workMachineId = 0
}) => {
  const epoch = BigInt(twEpoch)
  const dataCenterNode = BigInt(dataCenterId)
  const workMachineNode = BigInt(workMachineId)
  const sequenceBit = 12n
  const workMachineBit = 5n
  const dataCenterBit = 5n
  const maxDataCenterId = -1n ^ (-1n << dataCenterBit)
  const maxWorkMachineId = -1n ^ (-1n << workMachineBit)
  const maxSequence = -1n ^ (-1n << sequenceBit)
  const workMachineLeftShift = sequenceBit
  const dataCenterLeftShift = sequenceBit + workMachineBit
  const timestampLeftShift = dataCenterLeftShift + dataCenterBit
  const validateItems = [
    {
      id: dataCenterNode,
      maxId: maxDataCenterId,
      message:
        'The data center ID cannot be greater than ${maxId} or less than 0.'
    },
    {
      id: workMachineNode,
      maxId: maxWorkMachineId,
      message:
        'The working machine ID cannot be greater than ${maxId} or less than 0.'
    }
  ]

  let sequence = 0n
  let lastTimestamp = -1n

  for (const validateItem of validateItems) {
    validateId(validateItem)
  }

  return () => {
    const timestamp = getNewTimestamp()
    const generateNewId = initGenerateNewId({
      twEpoch: epoch,
      timestampLeftShift,
      dataCenterId: dataCenterNode,
      dataCenterLeftShift,
      workMachineId: workMachineNode,
      workMachineLeftShift
    })

    const timestampResult = handleTimestampEqual({
      timestamp,
      lastTimestamp,
      sequence,
      maxSequence
    })

    handleClockCallback(timestamp, lastTimestamp)

    const {
      id,
      lastTimestamp: newLastTimestamp,
      sequence: newSequence
    } = generateNewId(timestampResult)

    lastTimestamp = newLastTimestamp
    sequence = newSequence

    return id.toString()
  }
}
