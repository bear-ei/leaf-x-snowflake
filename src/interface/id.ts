import { HandleTimestampResult } from './timestamp'

/**
 * Generate ID options.
 */
export interface GenerateIdOptions {
  /**
   * Generate the start timestamp of the snowflake ID.
   */
  twEpoch: bigint

  /**
   * Timestamp left offset.
   */
  timestampLeftShift: bigint

  /**
   * Data center ID, value range 0 -31.
   */
  dataCenterId: bigint

  /**
   * Data center left offset.
   */
  dataCenterLeftShift: bigint

  /**
   * Working machine ID, value range 0 - 31.
   */
  workId: bigint

  /**
   * Working machine left offset.
   */
  workLeftShift: bigint
}

/**
 * Generate ID results.
 */
export interface GenerateIdResult {
  /**
   * New ID.
   */
  id: bigint

  /**
   * The last run timestamp.
   */
  lastTimestamp: bigint

  /**
   * Memory sequence in milliseconds.
   */
  sequence: bigint
}

/**
 * Generate a new ID.
 */
export interface GenerateIdFunction {
  (options: GenerateIdOptions): (
    handleTimestampResult: HandleTimestampResult
  ) => GenerateIdResult
}
