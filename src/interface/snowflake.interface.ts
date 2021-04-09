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
   * Start timestamp of the snowflake algorithm.
   */
  twEpoch: number
}

/**
 *  Function of the snowflake algorithm.
 */
export interface SnowflakeFunction {
  (options: SnowflakeOptions): () => string
}
