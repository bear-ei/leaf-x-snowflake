/**
 * Validate id options.
 */
export interface ValidateIdOptions {
  /**
   * Data centre id or machine id.
   */
  id: bigint

  /**
   * The maximum data centre id or machine id allowed.
   */
  maxId: bigint

  /**
   * Failure to validate the data centre id or machine id will return this
   * custom error message.
   */
  errorMessage: string
}

/**
 * Validate that the data centre id or machine id matches the requirements.
 */
export interface ValidateIdFunction {
  (options: ValidateIdOptions): void | never
}
