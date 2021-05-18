import {TimestampResult} from './timestamp.interface';

/**
 * Generate ID options.
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
 * Generate ID result.
 */
export interface GenerateIdResult {
  /**
   * New ID.
   */
  id: bigint;

  /**
   * Generate a timestamp of the last run of the ID.
   *
   */
  lastTimestamp: bigint;

  /**
   * Generate ID memory sequences in milliseconds.
   */
  sequence: bigint;
}

/**
 * Initialize the generated ID.
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
