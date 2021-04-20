import { TimestampResult } from './timestamp.interface'

/**
 * Generate a new ID options.
 */
export interface GenerateNewIdOptions {
  /**
   * Generate the start timestamp of the new ID.
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
 * Generate the result of the new ID.
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
 * Initialize to generate a new ID.
 *
 * @param options GenerateNewIdOptions
 * @return GenerateNewId
 */
export interface InitGenerateNewId {
  (options: GenerateNewIdOptions): GenerateNewId
}

/**
 * Generate a new ID.
 *
 * @param timestampResult TimestampResult
 * @return GenerateNewIdResult
 */
export interface GenerateNewId {
  (timestampResult: TimestampResult): GenerateNewIdResult
}
