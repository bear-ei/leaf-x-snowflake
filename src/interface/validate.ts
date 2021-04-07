/**
 * The options to validate the id.
 */
export interface ValidateIdOptions {
  /**
   * The data center id or work machine id that needs to be validated.
   */
  id: bigint

  /**
   * The maximum id range allowed.
   */
  maxId: bigint

  /**
   * A custom error message thrown when data center id or machine id
   * verification fails.
   */
  errorMessage: string
}

/**
 * Function to validate the id.
 */
export interface ValidateIdFunction {
  (options: ValidateIdOptions): void | never
}
