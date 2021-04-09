/**
 * Options to handle timestamps.
 */
export interface HandleTimestampOptions {
  /**
   * Current timestamp.
   */
  timestamp: bigint

  /**
   * Generate the timestamp of the last run of the new id.
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
 * Result of handle the timestamp.
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
 * Function to get the new timestamp.
 */
export interface GetTimestampFunction {
  (): bigint
}

/**
 * Function to handle equal timestamps.
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
 * Get the next millisecond timestamp function.
 */
export interface GetNextMillisecondFunction {
  (timestamp: bigint, lastTimestamp: bigint): bigint
}

/**
 * Function that handles the clock callback.
 */
export interface HandleClockBackFunction {
  (timestamp: bigint, lastTimestamp: bigint): void | never
}
