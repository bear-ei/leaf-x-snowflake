/**
 * Timestamp options.
 */
export interface TimestampOptions {
  /**
   * Current timestamp.
   */
  timestamp: bigint;

  /**
   * Last run time stamp.
   */
  lastTimestamp: bigint;

  /**
   * Memory sequence in milliseconds.
   */
  sequence: bigint;

  /**
   * Maximum memory sequence in milliseconds.
   */
  maxSequence: bigint;
}

/**
 * Timestamp result.
 */
export interface TimestampResult {
  /**
   * Current timestamp.
   */
  timestamp: bigint;

  /**
   * Memory sequence in milliseconds.
   */
  sequence: bigint;
}

/**
 * Get timestamp.
 *
 * @return GetTimestamp
 */
export interface GetTimestamp {
  (): bigint;
}

/**
 * Handle timestamps are equal.
 *
 * @param options TimestampOptions
 * @return TimestampResult
 */
export interface HandleTimestampEqual {
  (options: TimestampOptions): TimestampResult;
}

/**
 * Check if the next millisecond timestamp is obtained.
 *
 * @param options: TimestampOptions
 * @return TimestampResult
 */
export interface CheckGetNextMillisecond {
  (options: TimestampOptions): TimestampResult;
}

/**
 * Get the next millisecond timestamp.
 *
 * @param timestamp Current timestamp.
 * @param lastTimestamp Last run time stamp.
 * @return bigint
 */
export interface GetNextMillisecond {
  (timestamp: bigint, lastTimestamp: bigint): bigint;
}

/**
 * Handle clock callback.
 *
 * @param timestamp bigint
 * @param lastTimestamp bigint
 * @return void
 */
export interface HandleClockCallback {
  (timestamp: bigint, lastTimestamp: bigint): void;
}
