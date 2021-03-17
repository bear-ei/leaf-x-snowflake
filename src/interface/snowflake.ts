/**
 * Snowflake options.
 */
export interface SnowflakeOptions {
  /**
   * Data center id, value range 0 -31.
   */
  dataCenterId?: number

  /**
   * Work machine id, value range 0 - 31.
   */
  workerId?: number

  /**
   * The start timestamp for generating the id.
   */
  twEpoch: number
}

/**
 * Snowflake.
 */
export interface SnowflakeFunction {
  (options: SnowflakeOptions): () => string
}
