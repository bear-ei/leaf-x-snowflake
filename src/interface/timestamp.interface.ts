/**
 * Timestamp options.
 */
export interface TimestampOptions {
  /**
   * Current timestamp.
   */
  timestamp: bigint

  /**
   * The last run timestamp.
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
 * Timestamp results.
 */
export interface TimestampResult {
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
 * Get a new timestamp.
 *
 * @return bigint
 */
export interface GetNewTimestamp {
  (): bigint
}

/**
 * Processing timestamps are equal.
 *
 * @param options TimestampOptions
 * @return TimestampResult
 */
export interface ProcessTimestampEqual {
  (options: TimestampOptions): TimestampResult
}

/**
 * Check if you get the next millisecond timestamp.
 *
 * @param options TimestampOptions
 * @return TimestampResult
 */
export interface CheckGetNextMillisecond {
  (options: TimestampOptions): TimestampResult
}

/**
 * Get the next millisecond timestamp.
 *
 * @param timestamp     Current timestamp.
 * @param lastTimestamp The last run timestamp.
 * @return bigint
 */
export interface GetNextMillisecond {
  (timestamp: bigint, lastTimestamp: bigint): bigint
}

/**
 * Processing clock backhand.
 *
 * @param timestamp     Current timestamp.
 * @param lastTimestamp The last run timestamp.
 * @return void
 */
export interface ProcessClockCallback {
  (timestamp: bigint, lastTimestamp: bigint): void
}
