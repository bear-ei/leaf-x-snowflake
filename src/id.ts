import {InitGenerateNewId} from './interface/id.interface';

export const initGenerateNewId: InitGenerateNewId = ({
  twEpoch,
  timestampLeftShift,
  dataCenterId,
  dataCenterLeftShift,
  workMachineId,
  workMachineLeftShift,
}) => ({timestamp, sequence}) => ({
  lastTimestamp: timestamp,
  sequence,
  id:
    ((timestamp - twEpoch) << timestampLeftShift) |
    (dataCenterId << dataCenterLeftShift) |
    (workMachineId << workMachineLeftShift) |
    sequence,
});
