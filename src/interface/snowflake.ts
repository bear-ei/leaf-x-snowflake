/**
 * Options for the snowflake algorithm.
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
   * Timestamp of the start of the snowflake algorithm.
   */
  twEpoch: number
}

/**
 * The function of the snowflake algorithm.
 */
export interface SnowflakeFunction {
  (options: SnowflakeOptions): () => string
}
