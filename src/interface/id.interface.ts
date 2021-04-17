import { TimestampResult } from './timestamp.interface'

/**
 * New ID options.
 */
export interface NewIdOptions {
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
 * New ID results.
 */
export interface NewIdResult {
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
 * New ID.
 */
export interface NewId {
  (options: NewIdOptions): (timestampResult: TimestampResult) => NewIdResult
}
