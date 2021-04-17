/**
 * Snowflake algorithm options.
 */
export interface SnowflakeOptions {
  /**
   * Data center ID.
   */
  dataCenterId?: number

  /**
   * Work machine ID.
   */
  workId?: number

  /**
   * Timestamp of the start of the snowflake algorithm.
   */
  twEpoch: number
}

/**
 * Snowflake algorithm.
 */
export interface Snowflake {
  (options: SnowflakeOptions): () => string
}
