/**
 * Handle error messages.
 */
export interface HandleErrorFunction {
  (message?: string): never | void
}
