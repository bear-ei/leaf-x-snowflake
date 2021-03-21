/**
 * Validate ID options.
 */
export interface ValidateIdOptions {
  /**
   * The ID that needs to be verified.
   */
  id: bigint

  /**
   * The maximum ID allowed.
   */
  maxId: bigint

  /**
   * If the verification fails, this custom error message will be returned.
   */
  errorMessage: string
}

/**
 * Validate ID.
 */
export interface ValidateIdFunction {
  (options: ValidateIdOptions): void | never
}
