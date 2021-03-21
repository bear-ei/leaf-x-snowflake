/**
 * Snowflake options.
 */
export interface SnowflakeOptions {
  /**
   * Data center id, in the range 0 - 31.
   */
  dataCenterId?: number

  /**
   * Work machine ID, value range 0 - 31.
   */
  workId?: number

  /**
   * The start time for generating snowflake IDs.
   */
  twEpoch: number
}

/**
 * Snowflakes.
 */
export interface SnowflakeFunction {
  (options: SnowflakeOptions): () => string
}
