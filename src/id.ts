import { GenerateIdFunction } from './interface/id'

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
