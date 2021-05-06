import { TimestampResult } from './timestamp.interface'

/**
 * Generate a new ID options.
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
   * The data center left offset.
   */
  dataCenterLeftShift: bigint

  /**
   * Working machine ID.
   */
  workMachineId: bigint

  /**
   * Working machine left offset.
   */
  workMachineLeftShift: bigint
}

/**
 * Generate a new ID result.
 */
export interface GenerateNewIdResult {
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
 * Initialization Generates a new ID.
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
