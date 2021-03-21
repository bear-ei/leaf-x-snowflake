/**
 * Snowflake algorithm options.
 */
export interface SnowflakeOptions {
  /**
   * Data center ID, value range 0 -31.
   */
  dataCenterId?: number

  /**
   * Working machine ID, value range 0 - 31.
   */
  workId?: number

  /**
   * Generate the start timestamp of the snowflake ID.
   */
  twEpoch: number
}

/**
 * Snowflake algorithm.
 */
export interface SnowflakeFunction {
  (options: SnowflakeOptions): () => string
}
