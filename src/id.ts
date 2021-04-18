import { GenerateNewId } from './interface/id.interface'

export const generateNewId: GenerateNewId = ({
  twEpoch,
  timestampLeftShift,
  dataCenterId,
  dataCenterLeftShift,
  workId,
  workLeftShift
}) => ({ timestamp, sequence }) => ({
  id:
    ((timestamp - twEpoch) << timestampLeftShift) |
    (dataCenterId << dataCenterLeftShift) |
    (workId << workLeftShift) |
    sequence,
  lastTimestamp: timestamp,
  sequence
})
