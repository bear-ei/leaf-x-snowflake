import { HandleTimestampResult } from './timestamp.interface'

/**
 * Options to generate a new id.
 */
export interface GenerateIdOptions {
  /**
   * Generate the start timestamp of the new id.
   */
  twEpoch: bigint

  /**
   * Left offset of the timestamp.
   */
  timestampLeftShift: bigint

  /**
   * Data center id.
   */
  dataCenterId: bigint

  /**
   * Left offset of data center id.
   */
  dataCenterLeftShift: bigint

  /**
   * Work machine id.
   */
  workId: bigint

  /**
   * Left offset of the work machine id.
   */
  workLeftShift: bigint
}

/**
 * Generate the result of the new id.
 */
export interface GenerateIdResult {
  /**
   * New id generated.
   */
  id: bigint

  /**
   * Generate the timestamp of the last run of the new id.
   */
  lastTimestamp: bigint

  /**
   * Memory sequence in milliseconds.
   */
  sequence: bigint
}

/**
 * Function that generates the new id.
 */
export interface GenerateIdFunction {
  (options: GenerateIdOptions): (
    handleTimestampResult: HandleTimestampResult
  ) => GenerateIdResult
}
