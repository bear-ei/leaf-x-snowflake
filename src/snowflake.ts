import { compose } from 'lodash/fp'
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
      errorMessage:
        'The data center ID cannot be greater than ${maxId} or less than 0.'
    },
    {
      id: machineNode,
      maxId: maxMachineId,
      errorMessage:
        'The work machine ID cannot be greater than ${maxId} or less than 0.'
    }
  ]

  validateItems.forEach(validateId)

  return () => {
    const timestamp = getTimestamp()
    const getNextId = generateId({
      twEpoch: epoch,
      timestampLeftShift,
      dataCenterId: dataCenterNode,
      dataCenterLeftShift,
      workId: machineNode,
      workLeftShift
    })

    const getId = compose(getNextId, handleTimestampEqual)

    handleClockBack(timestamp, lastTimestamp)

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
