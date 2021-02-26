'use strict'

/**
 * Snowflake algorithm options.
 */
export interface SnowflakeOptions {
  /**
   * Data center id for performing snowflake algorithm.
   * Range of values 0 - 31.
   */
  dataCenterId?: number

  /**
   * Working machine id for executing the snowflake algorithm.
   * Range of values 0 - 31.
   */
  workerId?: number

  /**
   * Execution of the snowflake algorithm begins the epoch.
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
 * Validation id options.
 */
export interface ValidateIdOptions {
  /**
   * Data center id or work machine id.
   */
  id: bigint

  /**
   * Maximum ids allowed.
   */
  maxId: bigint

  /**
   * Error message thrown by authentication failure.
   */
  errorMessage: string
}

/**
 * Check if the work machine id or data center id exceeds the maximum id limit.
 */
export interface ValidateIdFunction {
  (options: ValidateIdOptions): string | undefined
}

/**
 * Accepts an error message and throws a new error.
 */
export interface HandleErrorFunction {
  (message?: string): never | void
}

/**
 * Get the new timestamp.
 */
export interface NewTimestampFunction {
  (): bigint
}

/**
 * Handle clock callbacks.
 *
 * @param timestamp         Timestamp.
 * @param lastTimestamp     Last execution timestamp.
 */
export interface ClockBackFunction {
  (timestamp: bigint, lastTimestamp: bigint): string | undefined
}

/**
 * Handle timestamp options.
 */
export interface HandleTimestampOptions {
  /**
   * Timestamp.
   */
  timestamp: bigint

  /**
   * Last execution timestamp.
   */
  lastTimestamp: bigint

  /**
   * Intra-millisecond sequence.
   */
  sequence: bigint

  /**
   * Maximum intra-millisecond sequence.
   */
  maxSequence: bigint
}

/**
 * Handle timestamp results.
 */
export interface HandleTimestampResult {
  /**
   * Timestamp.
   */
  timestamp: bigint

  /**
   * Intra-millisecond sequence.
   */
  sequence: bigint
}

/**
 * Whether to go to the next millisecond.
 */
export interface IsNextMillisecondFunction {
  (options: HandleTimestampOptions): HandleTimestampResult
}

/**
 * Next millisecond.
 *
 * @param timestamp         Timestamp.
 * @param lastTimestamp     Last execution timestamp.
 */
export interface NextMillisecondFunction {
  (timestamp: bigint, lastTimestamp: bigint): bigint
}

/**
 * Handle timestamps are equal.
 */
export interface TimestampEqualFunction {
  (options: HandleTimestampOptions): HandleTimestampResult
}

/**
 * Generate id options.
 */
export interface GenerateIdOptions {
  /**
   * Execution of the snowflake algorithm begins the epoch.
   */
  twEpoch: bigint

  /**
   * Timestamp left offset.
   */
  timestampLeftShift: bigint

  /**
   * Data center id for performing snowflake algorithm.
   * Range of values 0 - 31.
   */
  dataCenterId: bigint

  /**
   * Data center left offset.
   */
  dataCenterLeftShift: bigint

  /**
   * Working machine id for executing the snowflake algorithm.
   * Range of values 0 - 31.
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
   * Last execution timestamp.
   */
  lastTimestamp: bigint

  /**
   * Intra-millisecond sequence.
   */
  sequence: bigint
}

/**
 * Generate new id.
 */
export interface GenerateIdFunction {
  (
    options: GenerateIdOptions,
    HandleTimeResult: HandleTimestampResult
  ): GenerateIdResult
}
