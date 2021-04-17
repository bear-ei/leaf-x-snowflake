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
 * New timestamp.
 */
export interface NewTimestamp {
  (): bigint
}

/**
 * Timestamps are equal.
 */
export interface TimestampEqual {
  (options: TimestampOptions): TimestampResult
}

/**
 * Check the next millisecond timestamp.
 */
export interface CheckNextMillisecond {
  (options: TimestampOptions): TimestampResult
}

/**
 * The next millisecond timestamp.
 *
 * @param timestamp     Current timestamp.
 * @param lastTimestamp Last run timestamp.
 */
export interface NextMillisecond {
  (timestamp: bigint, lastTimestamp: bigint): bigint
}

/**
 * Clock back.
 *
 * @param timestamp     Current timestamp.
 * @param lastTimestamp Last run timestamp.
 */
export interface ClockBack {
  (timestamp: bigint, lastTimestamp: bigint): void | never
}
