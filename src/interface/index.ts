'use strict'

/**
 * Snowflake algorithm Options.
 */
export interface SnowflakeOptions {
  /**
   * Data center id.
   * Range of values 0 - 31.
   */
  dataCenterId: number

  /**
   * Work machine id.
   * Range of values 0 - 31.
   */
  workerId: number

  /**
   * Beginning of the Epoch.
   */
  twEpoch: number
}

/**
 * Validation id options.
 */
export interface ValidateIdOptions {
  /**
   * Waiting for verification id.
   */
  id: bigint

  /**
   * Maximum ids allowed.
   */
  maxId: bigint

  /**
   * Validation fails, error message thrown.
   */
  errorMessage: string
}

export interface ValidateIdFunction {
  (options: ValidateIdOptions): string | undefined
}

export interface HandleErrorFunction {
  (message?: string): void
}

export interface NewTimestampFunction {
  (): bigint
}

export interface ClockBackFunction {
  (timestamp: bigint, lastTimestamp: bigint): string | undefined
}

export interface HandleTimestampOptions {
  timestamp: bigint

  lastTimestamp: bigint

  sequence: bigint

  maxSequence: bigint
}

export interface HandleTimestampResult {
  /**
   * New timestamp.
   */
  timestamp: bigint

  /**
   * New intra-millisecond sequence.
   */
  sequence: bigint
}

export interface IsNextMillisecondFunction {
  (options: HandleTimestampOptions): HandleTimestampResult
}

export interface NextMillisecondFunction {
  (timestamp: bigint, lastTimestamp: bigint): bigint
}

export interface TimestampEqualFunction {
  (options: HandleTimestampOptions): HandleTimestampResult
}

export interface GenerateIdOptions {
  twEpoch: bigint

  timestampLeftShift: bigint

  dataCenterId: bigint

  dataCenterLeftShift: bigint

  workerId: bigint

  workerLeftShift: bigint
}

export interface GenerateIdResult {
  id: bigint

  lastTimestamp: bigint

  sequence: bigint
}

export interface GenerateIdFunction {
  (
    options: GenerateIdOptions,
    HandleTimeResult: HandleTimestampResult
  ): GenerateIdResult
}
