/**
 * Snowflake algorithm options.
 */
export interface SnowflakeOptions {
  /**
   * Data center id.
   */
  dataCenterId?: number

  /**
   * Work machine id.
   */
  workId?: number

  /**
   * The start timestamp of the snowflake algorithm.
   */
  twEpoch: number
}

/**
 * Snowflake algorithm.
 */
export interface SnowflakeFunction {
  (options: SnowflakeOptions): () => string
}
