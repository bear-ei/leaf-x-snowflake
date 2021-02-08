'use strict'

/**
 * Snowflake options.
 */
export interface SnowflakeOptions {
  /**
   * Era time of the start of the snowflake algorithm.
   */
  readonly twEpoch: number

  /**
   * Data centre id.
   */
  readonly dataCenterId?: number

  /**
   * Work machine id.
   */
  readonly workerId?: number
}

/**
 * Snowflake algorithm.
 *
 * @return () => string.
 */
export interface Snowflake {
  (options: SnowflakeOptions): () => string
}

/**
 * Validate id options.
 */
export interface ValidateIdOptions {
  /**
   * Data centre or work machine id.
   */
  readonly id: bigint

  /**
   * Maximum id range.
   */
  readonly maxId: bigint

  /**
   * Error message.
   */
  readonly message: string
}

/**
 * Validate id.
 */
export interface ValidateId {
  (options: ValidateIdOptions): void
}

/**
 * Timestamp.
 */
export interface Timestamp {
  /**
   * Current timestamp.
   */
  readonly timestamp: bigint

  /**
   * Last execution time stamp.
   */
  readonly lastTimestamp: bigint
}

/**
 * Timestamp difference.
 */
export interface TimestampDiff {
  (timestamp: Timestamp): Timestamp
}

/**
 * Equal time stamp.
 */
export interface EqualTimestamp {
  (sequence: Sequence, timestamp: Timestamp): NewMilliseconds
}

/**
 * Sequence.
 */
export interface Sequence {
  /**
   * Current Sequence.
   */
  readonly sequence: bigint

  /**
   * Maximum sequence range.
   */
  readonly maxSequence: bigint
}

/**
 * New milliseconds.
 */
export interface NewMilliseconds {
  /**
   * New Timestamp.
   */
  readonly timestamp: bigint

  /**
   * Sequence.
   */
  readonly sequence: bigint
}

/**
 * Whether to get the next milliseconds.
 */
export type IsNextMilliseconds = EqualTimestamp

/**
 * Next milliseconds.
 */
export interface NextMilliseconds {
  (timestamp: Timestamp): bigint
}

/**
 * New milliseconds.
 */
export interface NewTimestamp {
  (): bigint
}

/**
 * Generate id options.
 */
export interface GenerateIdOptions {
  /**
   * Era time of the start of the snowflake algorithm.
   */
  readonly twEpoch: bigint

  /**
   * Timestamp Left Offset Digits.
   *
   */
  readonly timestampLeftShift: bigint

  /**
   * Data centre id.
   */
  readonly dataCenterId: bigint

  /**
   * Number of data center left offset bits.
   */
  readonly dataCenterLeftShift: bigint

  /**
   * Work machine id.
   */
  readonly workerId: bigint

  /**
   * Number of left offset bits of working machine.
   */
  readonly workerLeftShift: bigint
}

/**
 * New id.
 */
export interface NewId {
  /**
   * Generated id.
   */
  readonly id: bigint

  /**
   * Last execution time stamp.
   */
  readonly lastTimestamp: bigint

  /**
   * Sequence.
   */
  readonly sequence: bigint
}

/**
 * Generate Id.
 *
 * @export
 * @interface GenerateId
 */
export interface GenerateId {
  (options: GenerateIdOptions, newMilliseconds: NewMilliseconds): NewId
}

/**
 * Handling errors.
 *
 * @param [message] Error message.
 */
export interface HandleError {
  (message?: string): void
}
