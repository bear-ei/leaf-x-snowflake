'use strict'

/**
 * Snowflake algorithm options.
 */
export interface SnowflakeOptions {
  /**
   * Data centre id, in the range 0 - 31.
   */
  dataCenterId?: number

  /**
   * Work machine id, in the range 0 - 31.
   */
  workerId?: number

  /**
   * Time of the era when the snowflake algorithm began.
   */
  twEpoch: number
}

/**
 * Snowflake algorithm function.
 */
export interface SnowflakeFunction {
  (options: SnowflakeOptions): () => string
}

/**
 * Validate the id options.
 */
export interface ValidateIdOptions {
  /**
   * The id of the data centre or the id of the working machine.
   */
  id: bigint

  /**
   * The maximum value of ids allowed.
   */
  maxId: bigint

  /**
   * This custom error message is returned if the id in the data or the id of
   * the working machine exceeds the maximum id value allowed.
   */
  errorMessage: string
}

/**
 * Validate the id function.
 */
export interface ValidateIdFunction {
  (options: ValidateIdOptions): string | void
}

/**
 * Handles error function.
 */
export interface HandleErrorFunction {
  (message?: string): never | void
}

/**
 * Get timestamp function.
 */
export interface GetTimestampFunction {
  (): bigint
}

/**
 * Handles clock back function.
 *
 * @param timestamp         Current timestamp.
 * @param lastTimestamp     Last run time stamp.
 */
export interface HandleClockBackFunction {
  (timestamp: bigint): (lastTimestamp: bigint) => string | void
}

/**
 * Handles timestamp options.
 */
export interface HandleTimestampOptions {
  /**
   * Current timestamp.
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
 * Handles timestamped results.
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
 * Whether to get the next millisecond function.
 */
export interface NextMillisecondFunction {
  (options: HandleTimestampOptions): HandleTimestampResult
}

/**
 * Get the next millisecond function.
 *
 * @param timestamp         Current timestamp.
 * @param lastTimestamp     Last run time stamp.
 */
export interface GetNextMillisecondFunction {
  (timestamp: bigint, lastTimestamp: bigint): bigint
}

/**
 * Handles timestamp equivalence function.
 */
export interface HandleTimestampEqualFunction {
  (options: HandleTimestampOptions): HandleTimestampResult
}

/**
 * Generate id options.
 */
export interface GenerateIdOptions {
  /**
   * Time of the era when the snowflake algorithm began.
   */
  twEpoch: bigint

  /**
   * Timestamp left offset.
   */
  timestampLeftShift: bigint

  /**
   * Data centre id, in the range 0 - 31.
   */
  dataCenterId: bigint

  /**
   * Data centre left offset.
   */
  dataCenterLeftShift: bigint

  /**
   * Work machine id, in the range 0 - 31.
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
 * Generate id function.
 */
export interface GenerateIdFunction {
  (options: GenerateIdOptions): (
    HandleTimeResult: HandleTimestampResult
  ) => GenerateIdResult
}
