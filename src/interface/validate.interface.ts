/**
 * Validate the ID options.
 */
export interface ValidateIdOptions {
  /**
   * Data Center ID or Working Machine ID.
   */
  id: bigint

  /**
   * The maximum ID allowed.
   */
  maxId: bigint

  /**
   * Validate the custom error message returned by the failed.
   */
  message: string
}

/**
 * Validate the ID.
 *
 * @param options ValidateIdOptions
 * @return void
 */
export interface ValidateId {
  (options: ValidateIdOptions): void
}
