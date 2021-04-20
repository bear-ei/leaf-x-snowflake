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
   * The start timestamp of the snowflake algorithm.
   */
  twEpoch: number
}

/**
 * Snowflake algorithm.
 *
 * @param options SnowflakeOptions
 * @return string
 */
export interface Snowflake {
  (options: SnowflakeOptions): () => string
}
