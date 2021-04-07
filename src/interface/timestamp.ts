/**
 * Options to handle timestamps.
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
 * The result of processing the timestamp.
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
 * The function to get the timestamp.
 */
export interface GetTimestampFunction {
  (): bigint
}

/**
 * Handles functions with equal timestamps.
 */
export interface HandleTimestampEqualFunction {
  (options: HandleTimestampOptions): HandleTimestampResult
}

/**
 * Function to check if the next millisecond timestamp is obtained.
 */
export interface CheckGetNextMillisecondFunction {
  (options: HandleTimestampOptions): HandleTimestampResult
}

/**
 * The function to get the next millisecond timestamp.
 */
export interface GetNextMillisecondFunction {
  (timestamp: bigint, lastTimestamp: bigint): bigint
}

/**
 * The function that handles the clock callback.
 */
export interface HandleClockBackFunction {
  (timestamp: bigint, lastTimestamp: bigint): void | never
}
