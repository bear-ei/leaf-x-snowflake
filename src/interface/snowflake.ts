'use strict'

/**
 * Snowflake options.
 */
export interface SnowflakeOptions {
  /**
   * Data center id.
   * Range of values 0~31.
   */
  dataCenterId?: number | bigint

  /**
   * Work machine id.
   * Range of values 0~31.
   */
  workerId?: number | bigint

  /**
   * Start timestamp.
   */
  twEpoch: number | bigint
}

/**
 * Snowflake.
 *
 * @return string id.
 */
export interface SnowflakeFunction {
  (options: SnowflakeOptions): () => string
}

/**
 * Validate id options.
 */
export interface ValidateIdOptions {
  /**
   * The id to be verified.
   */
  id: bigint

  /**
   * Maximum id range.
   */
  maxId: bigint

  /**
   * Error message returned for failed validation.
   */
  message: string
}

/**
 * Validate id.
 *
 * @return string | undefined Error message returned for failed validation.
 */
export interface ValidateIdFunction {
  (options: ValidateIdOptions): string | undefined
}

/**
 * Handling time options.
 */
export interface HandleTimeOptions {
  /**
   * Current timestamp.
   */
  timestamp: bigint

  /**
   * Last execution timestamp.
   */
  lastTimestamp: bigint

  /**
   * Intra-millisecond sequence.
   */
  sequence: bigint

  /**
   * Maximum sequence in milliseconds.
   */
  maxSequence: bigint
}

/**
 * Handle time result.
 */
export interface HandleTimeResult {
  /**
   * New timestamp.
   */
  timestamp: bigint

  /**
   * New intra-millisecond sequence.
   */
  sequence: bigint
}

/**
 * Difference between handling time and current time.
 *
 * @param timestamp             Current timestamp.
 * @param lastTimestamp         Last execution timestamp.
 * @return string | undefined   Error message for clock moving backwards.
 */
export interface TimeDiffFunction {
  (timestamp: bigint, lastTimestamp: bigint): string | undefined
}

/**
 * Determine whether to get the next millisecond timestamp.
 */
export interface IsNextMillisecondFunction {
  (options: HandleTimeOptions): HandleTimeResult
}

/**
 * Handling time and current time are equal.
 */
export interface TimeEqualFunction {
  (options: HandleTimeOptions): HandleTimeResult
}

/**
 * Next millisecond.
 */
export interface NextMillisecondFunction {
  (timestamp: bigint, lastTimestamp: bigint): bigint
}

/**
 * Generate id options.
 */
export interface GenerateIdOptions {
  /**
   * Start timestamp.
   */
  twEpoch: bigint

  /**
   * Timestamp is shifted left by 22 bits.
   */
  timestampLeftShift: bigint

  /**
   * Data Center id.
   * Range of values 0~31.
   */
  dataCenterId: bigint

  /**
   * Data center id left offset by 17 bits.
   */
  dataCenterLeftShift: bigint

  /**
   * Work machine id.
   * Range of values 0~31.
   */
  workerId: bigint

  /**
   * Work machine id left offset by 12 bits.
   */
  workerLeftShift: bigint
}

/**
 * Generate id result.
 */
export interface GenerateIdResult {
  /**
   * Generated id.
   */
  id: bigint

  /**
   * Last execution timestamp.
   */
  lastTimestamp: bigint

  /**
   * Intra-millisecond sequence.
   */
  sequence: bigint
}

/**
 * Generate id.
 */
export interface GenerateIdFunction {
  (
    options: GenerateIdOptions,
    HandleTimeResult: HandleTimeResult
  ): GenerateIdResult
}

/**
 * New timestamp.
 */
export interface NewTimestampFunction {
  (): bigint
}

/**
 * Handling error.
 *
 * @param [message] Error message.
 */
export interface HandleErrorFunction {
  (message?: string): void
}
