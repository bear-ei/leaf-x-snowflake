/**
 * Validate the id options.
 */
export interface ValidateIdOptions {
  /**
   * Data center id or work machine id.
   */
  id: bigint

  /**
   * The maximum id range allowed.
   */
  maxId: bigint

  /**
   * A custom error message thrown when authentication fails.
   */
  errorMessage: string
}

/**
 * Verification id.
 */
export interface ValidateIdFunction {
  (options: ValidateIdOptions): void | never
}
