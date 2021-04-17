import { newId } from './id'
import { Snowflake } from './interface/snowflake.interface'
import { clockBack, newTimestamp, timestampEqual } from './timestamp'
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
      message: 'Data center ID cannot be greater than ${maxId} or less than 0.'
    },
    {
      id: machineNode,
      maxId: maxMachineId,
      message: 'Work machine ID cannot be greater than ${maxId} or less than 0.'
    }
  ]

  validateItems.forEach(validateId)

  return () => {
    const timestamp = newTimestamp()
    const nextId = newId({
      twEpoch: epoch,
      timestampLeftShift,
      dataCenterId: dataCenterNode,
      dataCenterLeftShift,
      workId: machineNode,
      workLeftShift
    })

    const timestampResult = timestampEqual({
      timestamp,
      lastTimestamp,
      sequence,
      maxSequence
    })

    clockBack(timestamp, lastTimestamp)

    const {
      id,
      lastTimestamp: newLastTimestamp,
      sequence: newSequence
    } = nextId(timestampResult)

    lastTimestamp = newLastTimestamp
    sequence = newSequence

    return id.toString()
  }
}
