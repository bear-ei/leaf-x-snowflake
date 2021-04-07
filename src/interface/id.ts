import { HandleTimestampResult } from './timestamp'

/**
 * The options to generate the id.
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
   * Generate the id of the data center id.
   */
  dataCenterId: bigint

  /**
   * The amount of data center left offset.
   */
  dataCenterLeftShift: bigint

  /**
   * Generate the id of the working machine id.
   */
  workId: bigint

  /**
   * The work machine left offset amount.
   */
  workLeftShift: bigint
}

/**
 * Generate the result of id.
 */
export interface GenerateIdResult {
  /**
   * The new id generated.
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
 * The function that generates the id.
 */
export interface GenerateIdFunction {
  (options: GenerateIdOptions): (
    handleTimestampResult: HandleTimestampResult
  ) => GenerateIdResult
}
