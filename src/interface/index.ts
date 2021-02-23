'use strict'

/**
 * Snowflake algorithm Options.
 */
export interface SnowflakeOptions {
  /**
   * Data center id.
   * Range of values 0 - 31.
   */
  dataCenterId?: number

  /**
   * Work machine id.
   * Range of values 0 - 31.
   */
  workerId?: number

  /**
   * Beginning of the Epoch.
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
   * Waiting for verification id.
   */
  id: bigint

  /**
   * Maximum ids allowed.
   */
  maxId: bigint

  /**
   * Validation fails, error message thrown.
   */
  errorMessage: string
}

/**
 * Verification id.
 */
export interface ValidateIdFunction {
  (options: ValidateIdOptions): string | undefined
}

/**
 * Throwing an error message.
 */
export interface HandleErrorFunction {
  (message?: string): void
}

/**
 * Get new timestamp.
 */
export interface NewTimestampFunction {
  (): bigint
}

/**
 * Handling clock callbacks.
 *
 * @param timestamp         Timestamp.
 * @param lastTimestamp     Last execution Timestamp.
 */
export interface ClockBackFunction {
  (timestamp: bigint, lastTimestamp: bigint): string | undefined
}

/**
 * Handling Timestamp Options.
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
 * Handling Timestamp Results.
 */
export interface HandleTimestampResults {
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
  (options: HandleTimestampOptions): HandleTimestampResults
}

/**
 * Next millisecond.
 */
export interface NextMillisecondFunction {
  (timestamp: bigint, lastTimestamp: bigint): bigint
}

/**
 * Handling  timestamps are equal.
 */
export interface TimestampEqualFunction {
  (options: HandleTimestampOptions): HandleTimestampResults
}

/**
 * Generate id options.
 */
export interface GenerateIdOptions {
  /**
   * Beginning of the Epoch.
   */
  twEpoch: bigint

  /**
   * Timestamp left offset.
   */
  timestampLeftShift: bigint

  /**
   * Data center id.
   * Range of values 0 - 31.
   */
  dataCenterId: bigint

  /**
   * Data center left offset.
   */
  dataCenterLeftShift: bigint

  /**
   * Work machine id.
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
export interface GenerateIdResults {
  /**
   * New id.
   */
  id: bigint

  /**
   * Last execution time stamp.
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
    HandleTimeResult: HandleTimestampResults
  ): GenerateIdResults
}
