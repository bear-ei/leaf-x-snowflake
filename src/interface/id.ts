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
   * Data center id, value range 0 -31.
   */
  dataCenterId: bigint

  /**
   * The amount of data center left offset.
   */
  dataCenterLeftShift: bigint

  /**
   * Machine id, value range 0 - 31.
   */
  machineId: bigint

  /**
   * The amount of machine left offset.
   */
  machineLeftShift: bigint
}

/**
 * Generate id result.
 */
export interface GenerateIdResult {
  /**
   * New id.
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
 * Generate id.
 */
export interface GenerateIdFunction {
  (options: GenerateIdOptions): (
    handleTimestampResult: HandleTimestampResult
  ) => GenerateIdResult
}
