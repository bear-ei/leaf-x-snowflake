import { initGenerateNewId } from './id'
import { Snowflake } from './interface/snowflake.interface'
import {
  getNewTimestamp,
  processClockCallback,
  processTimestampEqual
} from './timestamp'
import { validateId } from './validate'

export const snowflake: Snowflake = ({
  twEpoch,
  dataCenterId = 0,
  workId = 0
}) => {
  const epoch = BigInt(twEpoch)
  const dataCenterNode = BigInt(dataCenterId)
  const machineNode = BigInt(workId)

  const sequenceBit = 12n
  const workBit = 5n
  const dataCenterBit = 5n

  const maxDataCenterId = -1n ^ (-1n << dataCenterBit)
  const maxMachineId = -1n ^ (-1n << workBit)
  const maxSequence = -1n ^ (-1n << sequenceBit)

  const workLeftShift = sequenceBit
  const dataCenterLeftShift = sequenceBit + workBit
  const timestampLeftShift = dataCenterLeftShift + dataCenterBit

  let sequence = 0n
  let lastTimestamp = -1n

  const validateItems = [
    {
      id: dataCenterNode,
      maxId: maxDataCenterId,
      message:
        'The data center ID cannot be greater than ${maxId} or less than 0.'
    },
    {
      id: machineNode,
      maxId: maxMachineId,
      message:
        'The working machine ID cannot be greater than ${maxId} or less than 0.'
    }
  ]

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
      workId: machineNode,
      workLeftShift
    })

    const timestampResult = processTimestampEqual({
      timestamp,
      lastTimestamp,
      sequence,
      maxSequence
    })

    processClockCallback(timestamp, lastTimestamp)

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
