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
   * The next millisecond memory sequence.
   */
  sequence: bigint
}

/**
 * Get timestamp.
 *
 * @return bigint
 */
export interface GetNewTimestamp {
  (): bigint
}

/**
 * Handle timestamps are equal.
 *
 * @param options TimestampOptions
 * @return TimestampResult
 */
export interface HandleTimestampEqual {
  (options: TimestampOptions): TimestampResult
}

/**
 * Check whether to get the next millisecond.
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
 * Handle clock callbacks.
 *
 * @param timestamp     Current timestamp.
 * @param lastTimestamp The last run timestamp.
 * @return void
 */
export interface HandleClockCallback {
  (timestamp: bigint, lastTimestamp: bigint): void
}
