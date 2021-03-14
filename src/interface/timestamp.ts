/**
 * Handles timestamp options.
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
 * Handles timestamp result.
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
 * Get timestamp.
 */
export interface GetTimestampFunction {
  (): bigint
}

/**
 * Handles timestamps are equal.
 */
export interface HandleTimestampEqualFunction {
  (options: HandleTimestampOptions): HandleTimestampResult
}

/**
 * Determines if the next millisecond timestamp should be fetched.
 */
export interface NextMillisecondFunction {
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
 * Handles situations where a clock backward shift occurs.
 *
 * @param timestamp         Current timestamp.
 * @param lastTimestamp     Last run time stamp.
 */
export interface HandleClockBackFunction {
  (timestamp: bigint): (lastTimestamp: bigint) => string | void
}
