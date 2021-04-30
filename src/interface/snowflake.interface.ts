/**
 * Snow flower algoric options.
 */
export interface SnowflakeOptions {
  /**
   * Data Center ID.
   */
  dataCenterId?: number

  /**
   * Working machine ID.
   */
  workId?: number

  /**
   * The timestamp of the snowflake algorithm.
   */
  twEpoch: number
}

/**
 * Snow flower algorithm.
 *
 * @param options SnowflakeOptions
 * @return string
 */
export interface Snowflake {
  (options: SnowflakeOptions): () => string
}
