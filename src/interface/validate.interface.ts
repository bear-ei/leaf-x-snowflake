/**
 * Validate ID options.
 */
export interface ValidateIdOptions {
  /**
   * Data center ID or work machine ID.
   */
  id: bigint

  /**
   * The maximum allowed data center ID or work machine ID.
   */
  maxId: bigint

  /**
   * This custom failure message will be thrown when the validation fails.
   */
  message: string
}

/**
 * Validate ID.
 *
 * @param options ValidateIdOptions
 * @return void
 */
export interface ValidateId {
  (options: ValidateIdOptions): void
}
