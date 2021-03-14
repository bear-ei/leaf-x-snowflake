/**
 * Handles error messages.
 */
export interface HandleErrorMessageFunction {
  (message?: string): never | void
}
