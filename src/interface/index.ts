'use strict'

/**
 * Snowflake algorithm options.
 */
export interface SnowflakeOptions {
  /**
   * Data centre id.
   * Value range 0 - 31.
   */
  dataCenterId?: number

  /**
   * Work machine id
   * Value range 0 - 31.
   */
  workerId?: number

  /**
   * Epoch time for the start of the snowflake algorithm.
   */
  twEpoch: number
}

/**
 * Snowflake algorithm.
 */
export interface SnowflakeFunction {
  (options: SnowflakeOptions): () => string
}

/**
 * Validate id options.
 */
export interface ValidateIdOptions {
  /**
   * Data centre id or work machine id.
   */
  id: bigint

  /**
   * Maximum id range.
   */
  maxId: bigint

  /**
   * Error message thrown by failed validation.
   */
  errorMessage: string
}

/**
 * Validate id.
 */
export interface ValidateIdFunction {
  (options: ValidateIdOptions): string | undefined
}

/**
 * Handling errors.
 */
export interface HandleErrorFunction {
  (message?: string): never | void
}

/**
 * Get new timestamp.
 */
export interface GetNewTimestampFunction {
  (): bigint
}

/**
 * Handling clock callbacks.
 *
 * @param timestamp         Current timestamp.
 * @param lastTimestamp     Last run time stamp.
 */
export interface HandleClockBackFunction {
  (timestamp: bigint): (lastTimestamp: bigint) => string | undefined
}

/**
 * Handling timestamp options.
 */
export interface HandleTimestampOptions {
  /**
   * Current Timestamp.
   */
  timestamp: bigint

  /**
   * Last run time stamp.
   */
  lastTimestamp: bigint

  /**
   * Intra-millisecond sequences.
   */
  sequence: bigint

  /**
   * Maximum sequence in milliseconds.
   */
  maxSequence: bigint
}

/**
 * Handling timestamped results.
 */
export interface HandleTimestampResult {
  /**
   * Timestamp.
   */
  timestamp: bigint

  /**
   * Intra-millisecond sequences.
   */
  sequence: bigint
}

/**
 * Whether to enter a millisecond.
 */
export interface IsNextMillisecondFunction {
  (options: HandleTimestampOptions): HandleTimestampResult
}

/**
 * Get the next millisecond timestamp.
 *
 * @param timestamp         Current timestamp.
 * @param lastTimestamp     Last run time stamp.
 */
export interface GetNextMillisecondFunction {
  (timestamp: bigint, lastTimestamp: bigint): bigint
}

/**
 * Handling timestamps are equal.
 */
export interface HandleTimestampEqualFunction {
  (options: HandleTimestampOptions): HandleTimestampResult
}

/**
 * Generate id options.
 */
export interface GenerateIdOptions {
  /**
   * Epoch time for the start of the snowflake algorithm.
   */
  twEpoch: bigint

  /**
   * Timestamp left offset.
   */
  timestampLeftShift: bigint

  /**
   * Data centre id.
   * Value range 0 - 31.
   */
  dataCenterId: bigint

  /**
   * Data centre left offset.
   */
  dataCenterLeftShift: bigint

  /**
   * Work machine id
   * Value range 0 - 31.
   */
  workerId: bigint

  /**
   * Work machine left offset.
   */
  workerLeftShift: bigint
}

/**
 * Generate id results.
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
   * Intra-millisecond sequences.
   */
  sequence: bigint
}

/**
 * Generate new id.
 */
export interface GenerateIdFunction {
  (options: GenerateIdOptions): (HandleTimeResult: HandleTimestampResult) => GenerateIdResult
}
