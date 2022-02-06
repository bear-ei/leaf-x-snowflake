import {initGenerateNewId} from './id';
import {
  getTimestamp,
  handleClockCallback,
  handleTimestampEqual,
} from './timestamp';
import {validateId} from './validate';

/**
 * Snowflake algorithm options.
 */
export interface SnowflakeOptions {
  /**
   * Data center ID.
   */
  dataCenterId?: number;

  /**
   * Work machine ID.
   */
  workMachineId?: number;

  /**
   * The snowflake algorithm starts at the epoch time.
   */
  twEpoch: number;
}

/**
 * Snowflake algorithm.
 *
 * @param options Snowflake algorithm options.
 */
export const snowflake = ({
  twEpoch,
  dataCenterId = 0,
  workMachineId = 0,
}: SnowflakeOptions) => {
  const epoch = BigInt(twEpoch);
  const dataCenterNode = BigInt(dataCenterId);
  const workMachineNode = BigInt(workMachineId);
  const sequenceBit = BigInt(12);
  const workMachineBit = BigInt(5);
  const dataCenterBit = BigInt(5);
  const maxDataCenterId = BigInt(-1) ^ (BigInt(-1) << dataCenterBit);
  const maxWorkMachineId = BigInt(-1) ^ (BigInt(-1) << workMachineBit);
  const maxSequence = BigInt(-1) ^ (BigInt(-1) << sequenceBit);
  const workMachineLeftShift = sequenceBit;
  const dataCenterLeftShift = sequenceBit + workMachineBit;
  const timestampLeftShift = dataCenterLeftShift + dataCenterBit;
  const validateItems = [
    {
      id: dataCenterNode,
      maxId: maxDataCenterId,
      message:
        'The data center ID cannot be greater than ${maxId} or less than 0.',
    },
    {
      id: workMachineNode,
      maxId: maxWorkMachineId,
      message:
        'The work machine ID cannot be greater than ${maxId} or less than 0.',
    },
  ];

  let sequence = BigInt(0);
  let lastTimestamp = BigInt(-1);

  validateItems.forEach(validateId);

  return () => {
    const timestamp = getTimestamp();
    const generateNewId = initGenerateNewId({
      twEpoch: epoch,
      timestampLeftShift,
      dataCenterId: dataCenterNode,
      dataCenterLeftShift,
      workMachineId: workMachineNode,
      workMachineLeftShift,
    });

    const timestampResult = handleTimestampEqual({
      timestamp,
      lastTimestamp,
      sequence,
      maxSequence,
    });

    handleClockCallback(timestamp, lastTimestamp);

    const {
      id,
      lastTimestamp: newLastTimestamp,
      sequence: newSequence,
    } = generateNewId(timestampResult);

    lastTimestamp = newLastTimestamp;
    sequence = newSequence;

    return id.toString();
  };
};
