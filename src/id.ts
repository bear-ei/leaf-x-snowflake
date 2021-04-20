import { InitGenerateNewId } from './interface/id.interface'

export const initGenerateNewId: InitGenerateNewId = ({
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
