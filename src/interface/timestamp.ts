/**
 * Handle timestamp options.
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
 * Handle timestamp results.
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
 * Get the current timestamp.
 */
export interface GetTimestampFunction {
  (): bigint
}

/**
 * Handle timestamps are equal.
 */
export interface HandleTimestampEqualFunction {
  (options: HandleTimestampOptions): HandleTimestampResult
}

/**
 * Check to get the next millisecond timestamp or not.
 */
export interface CheckGetNextMillisecondFunction {
  (options: HandleTimestampOptions): HandleTimestampResult
}

/**
 * Get the next millisecond timestamp.
 */
export interface GetNextMillisecondFunction {
  (timestamp: bigint, lastTimestamp: bigint): bigint
}

/**
 * Handle clock callback.
 */
export interface HandleClockBackFunction {
  (timestamp: bigint, lastTimestamp: bigint): void | never
}
