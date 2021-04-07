/**
 * Options for the snowflake algorithm.
 */
export interface SnowflakeOptions {
  /**
   * Data center id.
   */
  dataCenterId?: number

  workerId?: number

  twEpoch: number
}

export interface SnowflakeFunction {
  (options: SnowflakeOptions): () => string
}
