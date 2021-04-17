import { NewId } from './interface/id.interface'

export const newId: NewId = ({
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
