/**
 * Snowflake algorithm options.
 */
export interface SnowflakeOptions {
  /**
   * Data center id, default value 0, allowed values range 0-31.
   */
  dataCenterId?: number

  /**
   * Machine id, default value 0, allowed values range 0-31.
   */
  machineId?: number

  /**
   * The start time of generating the id.
   */
  twEpoch: number
}

/**
 * Snowflake algorithm.
 */
export interface SnowflakeFunction {
  (options: SnowflakeOptions): () => string
}
