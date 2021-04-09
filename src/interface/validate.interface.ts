/**
 * Options to validate the data center id or work machine id.
 */
export interface ValidateIdOptions {
  /**
   * Data center id or work machine id.
   */
  id: bigint

  /**
   * Maximum id range allowed.
   */
  maxId: bigint

  /**
   * Custom error message thrown when data center id or work machine id
   * verification fails.
   */
  errorMessage: string
}

/**
 * Function to validate the data center id or work machine id.
 */
export interface ValidateIdFunction {
  (options: ValidateIdOptions): void | never
}
