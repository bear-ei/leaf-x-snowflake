/**
 * Timestamp options.
 */
export interface TimestampOptions {
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
 * Timestamp results.
 */
export interface TimestampResult {
  /**
   * New timestamp.
   */
  timestamp: bigint

  /**
   * Memory sequence in new milliseconds.
   */
  sequence: bigint
}

/**
 * Get the new timestamp.
 */
export interface GetNewTimestamp {
  (): bigint
}

/**
 * Handle timestamps are equal.
 *
 * @param options Timestamp options.
 */
export interface HandleTimestampEqual {
  (options: TimestampOptions): TimestampResult
}

/**
 * Check to get the next millisecond timestamp or not.
 *
 * @param options Timestamp options.
 */
export interface CheckGetNextMillisecond {
  (options: TimestampOptions): TimestampResult
}

/**
 * Get the next millisecond timestamp.
 *
 * @param timestamp     Current timestamp.
 * @param lastTimestamp Last run timestamp.
 */
export interface GetNextMillisecond {
  (timestamp: bigint, lastTimestamp: bigint): bigint
}

/**
 * Handle clock callbacks.
 *
 * @param timestamp     Current timestamp.
 * @param lastTimestamp Last run timestamp.
 */
export interface HandleClockCallback {
  (timestamp: bigint, lastTimestamp: bigint): void | never
}
