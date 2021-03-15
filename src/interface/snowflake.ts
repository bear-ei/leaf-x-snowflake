/**
 * Snowflake options.
 */
export interface SnowflakeOptions {
  /**
   * Data center id, value range 0 -31.
   */
  dataCenterId?: number

  /**
   * Machine id, value range 0 - 31.
   */
  machineId?: number

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
