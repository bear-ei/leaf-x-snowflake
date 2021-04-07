/**
 * Handles the timestamp options.
 */
export interface HandleTimestampOptions {
  /**
   * Current timestamp.
   */
  timestamp: bigint

  /**
   * Last run timestamp.
   */
  lastTimestamp: bigint

  /**
   * The memory sequence in milliseconds.
   */
  sequence: bigint

  /**
   * Maximum memory sequence in milliseconds.
   */
  maxSequence: bigint
}

/**
 * Handles the timestamp results.
 */
export interface HandleTimestampResult {
  /**
   * New timestamp.
   */
  timestamp: bigint

  /**
   * The memory sequence in milliseconds.
   */
  sequence: bigint
}

/**
 * Get the timestamp.
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
 * Check to get the next millisecond.
 */
export interface CheckGetNextMillisecondFunction {
  (options: HandleTimestampOptions): HandleTimestampResult
}

/**
 * Get the next millisecond.
 *
 * @param timestamp         Current timestamp.
 * @param lastTimestamp     Last run timestamp.
 */
export interface GetNextMillisecondFunction {
  (timestamp: bigint, lastTimestamp: bigint): bigint
}

/**
 * Handles clock callback.
 *
 * @param timestamp        Current timestamp.
 * @param lastTimestamp    Last run timestamp.
 */
export interface HandleClockBackFunction {
  (timestamp: bigint, lastTimestamp: bigint): void | never
}
