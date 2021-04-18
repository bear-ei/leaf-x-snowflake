import { TimestampResult } from './timestamp.interface'

/**
 * Generate new ID options.
 */
export interface GenerateNewIdOptions {
  /**
   * The start timestamp for generating the ID.
   */
  twEpoch: bigint

  /**
   * Timestamp left offset.
   */
  timestampLeftShift: bigint

  /**
   * Data center ID.
   */
  dataCenterId: bigint

  /**
   * Data center left offset.
   */
  dataCenterLeftShift: bigint

  /**
   * Work machine ID.
   */
  workId: bigint

  /**
   * Work machine left offset.
   */
  workLeftShift: bigint
}

/**
 * Generate new ID results.
 */
export interface GenerateNewIdResult {
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
 * Generate new ID.
 */
export interface GenerateNewId {
  (options: GenerateNewIdOptions): (
    timestampResult: TimestampResult
  ) => GenerateNewIdResult
}
