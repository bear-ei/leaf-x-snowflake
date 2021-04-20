/**
 * Validate the ID options.
 */
export interface ValidateIdOptions {
  /**
   * Data center or work machine ID.
   */
  id: bigint

  /**
   * The maximum ID range allowed.
   */
  maxId: bigint

  /**
   * A custom error message thrown when authentication fails.
   */
  message: string
}

/**
 * Validate the ID.
 *
 * @param options Validate the ID options.
 */
export interface ValidateId {
  (options: ValidateIdOptions): void | never
}
