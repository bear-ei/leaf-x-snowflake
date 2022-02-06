/**
 * The options to generate a new ID.
 */
export interface GenerateNewIdOptions {
  /**
   * The snowflake algorithm starts at the epoch time.
   */
  twEpoch: bigint;

  /**
   * Timestamp left offset.
   */
  timestampLeftShift: bigint;

  /**
   * Data center ID.
   */
  dataCenterId: bigint;

  /**
   * Data center ID left offset.
   */
  dataCenterLeftShift: bigint;

  /**
   * Work machine ID.
   */
  workMachineId: bigint;

  /**
   * Work machine ID left offset.
   */
  workMachineLeftShift: bigint;
}

/**
 * Initialize to generate a new ID.
 *
 * @param options GenerateNewIdOptions
 */
export const initGenerateNewId = ({
  twEpoch,
  timestampLeftShift,
  dataCenterId,
  dataCenterLeftShift,
  workMachineId,
  workMachineLeftShift,
}: GenerateNewIdOptions) => ({
  timestamp,
  sequence,
}: {
  timestamp: bigint;
  sequence: bigint;
}) => ({
  lastTimestamp: timestamp,
  sequence,
  id:
    ((timestamp - twEpoch) << timestampLeftShift) |
    (dataCenterId << dataCenterLeftShift) |
    (workMachineId << workMachineLeftShift) |
    sequence,
});
