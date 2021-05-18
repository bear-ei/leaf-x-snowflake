import {InitGenerateId} from './interface/id.interface';

export const initGenerateNewId: InitGenerateId = ({
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
