import { HandleTimestampResult } from './timestamp'

/**
 * Generate id options.
 */
export interface GenerateIdOptions {
  /**
   * The start time of generating the id.
   */
  twEpoch: bigint

  /**
   * Timestamp left offset.
   */
  timestampLeftShift: bigint

  /**
   * Data centre id, binary values in the range 0-31 are allowed.
   */
  dataCenterId: bigint

  /**
   * Data centre left offset.
   */
  dataCenterLeftShift: bigint

  /**
   * Machine id, binary values in the range 0-31 are allowed.
   */
  machineId: bigint

  /**
   * Machine left offset.
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
   * Last run time stamp.
   */
  lastTimestamp: bigint

  /**
   * Memory sequence in milliseconds.
   */
  sequence: bigint
}

/**
 * Generate the id.
 */
export interface GenerateIdFunction {
  (options: GenerateIdOptions): (
    handleTimestampResult: HandleTimestampResult
  ) => GenerateIdResult
}
