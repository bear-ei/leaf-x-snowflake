import {TimestampResult} from './timestamp.interface';

/**
 * The options to generate an ID.
 */
export interface GenerateNewIdOptions {
  /**
   * Generate a timestamp for the start of the ID.
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
 * Generate the result of the ID.
 */
export interface GenerateIdResult {
  /**
   * The new ID generated.
   */
  id: bigint;

  /**
   * Generate the last run time stamp of the new ID.
   *
   */
  lastTimestamp: bigint;

  /**
   * Generate a memory sequence of new IDs in milliseconds.
   */
  sequence: bigint;
}

/**
 * Initialize the function that generates the ID.
 *
 * @param options GenerateNewIdOptions
 * @return GenerateId
 */
export interface InitGenerateId {
  (options: GenerateNewIdOptions): GenerateId;
}

/**
 * Generate ID.
 *
 * @param timestampResult TimestampResult
 * @return GenerateIdResult
 */
export interface GenerateId {
  (timestampResult: TimestampResult): GenerateIdResult;
}
