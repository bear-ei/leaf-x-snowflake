/**
 * Validate the ID options.
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
   * If the ID does not pass validation, this custom error message will be returned.
   */
  errorMessage: string
}

/**
 * Validate the ID.
 */
export interface ValidateIdFunction {
  (options: ValidateIdOptions): void | never
}
