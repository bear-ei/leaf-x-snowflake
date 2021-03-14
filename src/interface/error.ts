/**
 * Handles error message.
 */
export interface HandleErrorMessageFunction {
  (message?: string): never | void
}
