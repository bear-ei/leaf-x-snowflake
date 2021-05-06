/**
 * Snowflake algorithm options.
 */
export interface SnowflakeOptions {
  /**
   * Data center ID.
   */
  dataCenterId?: number

  /**
   * Working machine ID.
   */
  workMachineId?: number

  /**
   * Timestamp of the start of the snowflake algorithm.
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
