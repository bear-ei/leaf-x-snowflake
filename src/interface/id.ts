import { HandleTimestampResult } from './timestamp'

/**
 * Generate ID options.
 */
export interface GenerateIdOptions {
  /**
   * The start time for generating snowflake IDs.
   */
  twEpoch: bigint

  /**
   * The timestamp left offset.
   */
  timestampLeftShift: bigint

  /**
   * Data center ID.
   */
  dataCenterId: bigint

  /**
   * The data center left offset.
   */
  dataCenterLeftShift: bigint

  /**
   * Work machine ID.
   */
  workId: bigint

  /**
   * The work machine left offset.
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
   * Last run timestamp.
   */
  lastTimestamp: bigint

  /**
   * The memory sequence in milliseconds.
   */
  sequence: bigint
}

/**
 * Generate the ID.
 */
export interface GenerateIdFunction {
  (options: GenerateIdOptions): (
    handleTimestampResult: HandleTimestampResult
  ) => GenerateIdResult
}
