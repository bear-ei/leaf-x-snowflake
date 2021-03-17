import { GenerateIdFunction } from './interface/id'

export const generateId: GenerateIdFunction = ({
  twEpoch,
  timestampLeftShift,
  dataCenterId,
  dataCenterLeftShift,
  workerId,
  machineLeftShift
}) => ({ timestamp, sequence }) => ({
  id:
    ((timestamp - twEpoch) << timestampLeftShift) |
    (dataCenterId << dataCenterLeftShift) |
    (workerId << machineLeftShift) |
    sequence,
  lastTimestamp: timestamp,
  sequence
})
