/**
 * Timestamp options.
 */
export interface TimestampOptions {
  /**
   * Current timestamp.
   */
  timestamp: bigint

  /**
   * Generate the last run time stamp of the new ID.
   */
  lastTimestamp: bigint

  /**
   * Generate a memory sequence of new IDs in milliseconds.
   */
  sequence: bigint

  /**
   * Generate the maximum memory sequence of new IDs in milliseconds.
   */
  maxSequence: bigint
}

/**
 * Timestamp result.
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
 * Handle timestamps equally.
 *
 * @param options TimestampOptions
 * @return TimestampResult
 */
export interface HandleTimestampEqual {
  (options: TimestampOptions): TimestampResult
}

/**
 * Check if the next millisecond timestamp is obtained.
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
 * @param lastTimestamp Generate the last run time stamp of the new ID.
 * @return bigint
 */
export interface GetNextMillisecond {
  (timestamp: bigint, lastTimestamp: bigint): bigint
}

/**
 * Handle clock callbacks.
 *
 * @param timestamp     Current timestamp.
 * @param lastTimestamp Generate the last run time stamp of the new ID.
 * @return void
 */
export interface HandleClockCallback {
  (timestamp: bigint, lastTimestamp: bigint): void
}
