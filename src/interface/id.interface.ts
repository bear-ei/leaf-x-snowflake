import {TimestampResult} from './timestamp.interface';

/**
 * Generate new ID options.
 */
export interface GenerateNewIdOptions {
  /**
   * Generate the start timestamp of the new ID.
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
   * Data center left offset.
   */
  dataCenterLeftShift: bigint;

  /**
   * Work machine ID.
   */
  workMachineId: bigint;

  /**
   * Work machine left offset.
   */
  workMachineLeftShift: bigint;
}

/**
 * Generate new ID result.
 */
export interface GenerateNewIdResult {
  /**
   * New ID.
   */
  id: bigint;

  /**
   * Generate the last run time stamp of the new ID.
   */
  lastTimestamp: bigint;

  /**
   * Generate memory sequence of new IDs in milliseconds.
   */
  sequence: bigint;
}

/**
 * Initialize to generate new ID.
 *
 * @param options GenerateNewIdOptions
 * @return GenerateNewId
 */
export interface InitGenerateNewId {
  (options: GenerateNewIdOptions): GenerateNewId;
}

/**
 * Generate new ID.
 *
 * @param timestampResult TimestampResult
 * @return GenerateNewIdResult
 */
export interface GenerateNewId {
  (timestampResult: TimestampResult): GenerateNewIdResult;
}
