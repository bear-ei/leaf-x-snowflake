'use strict'

/**
 * Snowflake algorithm options.
 */
export interface SnowflakeOptions {
  /**
   * Data center id, default value 0, allowed values range 0-31.
   */
  dataCenterId?: number

  /**
   * Machine id, default value 0, allowed values range 0-31.
   */
  machineId?: number

  /**
   * Time for the snowflake algorithm to begin.
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
   * Data centre id or machine id.
   */
  id: bigint

  /**
   * The maximum data centre id or machine id allowed.
   */
  maxId: bigint

  /**
   * Failure to validate the data centre id or machine id will return this
   * custom error message.
   */
  errorMessage: string
}

/**
 * Validate that the data centre id or machine id matches the requirements.
 */
export interface ValidateIdFunction {
  (options: ValidateIdOptions): string | void
}

/**
 * Handle error messages.
 */
export interface HandleErrorFunction {
  (message?: string): never | void
}

/**
 * Get the timestamp.
 */
export interface GetTimestampFunction {
  (): bigint
}

/**
 * Handle clock setbacks.
 *
 * @param timestamp         Current timestamp.
 * @param lastTimestamp     Last run time stamp.
 */
export interface HandleClockBackFunction {
  (timestamp: bigint): (lastTimestamp: bigint) => string | void
}

/**
 * Handle timestamp options.
 */
export interface HandleTimestampOptions {
  /**
   * Current timestamp.
   */
  timestamp: bigint

  /**
   * Last run time stamp.
   */
  lastTimestamp: bigint

  /**
   * Memory sequence in milliseconds.
   */
  sequence: bigint

  /**
   * Maximum memory sequence in milliseconds.
   */
  maxSequence: bigint
}

/**
 * Handle timestamped results.
 */
export interface HandleTimestampResult {
  /**
   * New timestamp.
   */
  timestamp: bigint

  /**
   * Memory sequence in milliseconds.
   */
  sequence: bigint
}

/**
 * Whether to get the next millisecond timestamp.
 */
export interface NextMillisecondFunction {
  (options: HandleTimestampOptions): HandleTimestampResult
}

/**
 * Gets the next millisecond timestamp.
 *
 * @param timestamp         Current timestamp.
 * @param lastTimestamp     Last run time stamp.
 */
export interface GetNextMillisecondFunction {
  (timestamp: bigint, lastTimestamp: bigint): bigint
}

/**
 * Handle timestamps are equal.
 */
export interface HandleTimestampEqualFunction {
  (options: HandleTimestampOptions): HandleTimestampResult
}

/**
 * Generate id options.
 */
export interface GenerateIdOptions {
  /**
   * Time for the snowflake algorithm to begin.
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
   * Memory sequence in milliseconds.
   */
  sequence: bigint
}

/**
 * Generate the id.
 */
export interface GenerateIdFunction {
  (options: GenerateIdOptions): (
    HandleTimeResult: HandleTimestampResult
  ) => GenerateIdResult
}
