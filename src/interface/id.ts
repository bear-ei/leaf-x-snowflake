import { HandleTimestampResult } from './timestamp'

/**
 * Generate id options.
 */
export interface GenerateIdOptions {
  /**
   * The start timestamp for generating the id.
   */
  twEpoch: bigint

  /**
   * The left offset of the timestamp.
   */
  timestampLeftShift: bigint

  /**
   * Data center id.
   */
  dataCenterId: bigint

  /**
   * The amount of data center left offset.
   */
  dataCenterLeftShift: bigint

  /**
   * Work machine id.
   */
  workId: bigint

  /**
   * The work machine left offset amount.
   */
  workLeftShift: bigint
}

/**
 * Generate id results.
 */
export interface GenerateIdResult {
  /**
   * Generate a new id.
   */
  id: bigint

  /**
   * Last execution timestamp.
   */
  lastTimestamp: bigint

  /**
   * The memory sequence in milliseconds.
   */
  sequence: bigint
}

/**
 * Generate id.
 */
export interface GenerateIdFunction {
  (options: GenerateIdOptions): (
    handleTimestampResult: HandleTimestampResult
  ) => GenerateIdResult
}
