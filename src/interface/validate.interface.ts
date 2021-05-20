/**
 * Validate ID options.
 */
export interface ValidateIdOptions {
  /**
   * Data center ID or work machine ID.
   */
  id: bigint;

  /**
   * The maximum allowed ID range.
   */
  maxId: bigint;

  /**
   * Custom error message thrown when validate does not pass.
   */
  message: string;
}

/**
 * Validate ID
 *
 * @param options ValidateIdOptions
 * @return void | never
 */
export interface ValidateId {
  (options: ValidateIdOptions): void | never;
}
