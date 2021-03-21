/**
 * Handling timestamp options.
 */
export interface HandleTimestampOptions {
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
 * Handling timestamp results.
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
 * Treatment timestamp is equal.
 */
export interface HandleTimestampEqualFunction {
  (options: HandleTimestampOptions): HandleTimestampResult
}

/**
 * Check if you get the next milliseconds.
 */
export interface CheckGetNextMillisecondFunction {
  (options: HandleTimestampOptions): HandleTimestampResult
}

/**
 * Get the next milliseconds.
 *
 * @param timestamp         Current timestamp.
 * @param lastTimestamp     The last run timestamp.
 */
export interface GetNextMillisecondFunction {
  (timestamp: bigint, lastTimestamp: bigint): bigint
}

/**
 * Handling clock back.
 *
 * @param timestamp        Current timestamp.
 * @param lastTimestamp    The last run timestamp.
 */
export interface HandleClockBackFunction {
  (timestamp: bigint, lastTimestamp: bigint): void | never
}
