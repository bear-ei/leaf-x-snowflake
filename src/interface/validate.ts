/**
 * Validate id options.
 */
export interface ValidateIdOptions {
  /**
   * Data center id or machine id.
   */
  id: bigint

  /**
   * The maximum allowed data center id or machine id.
   */
  maxId: bigint

  /**
   * This error message will be returned if the data center id or machine id
   * cannot be verified.
   */
  errorMessage: string
}

/**
 * Validate that the data center id or machine id matches the requirements.
 */
export interface ValidateIdFunction {
  (options: ValidateIdOptions): void | never
}
