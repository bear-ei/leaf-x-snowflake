import { HandleErrorMessageFunction } from './interface/error'

export const handleErrorMessage: HandleErrorMessageFunction = (message) => {
  if (message) {
    throw new Error(message)
  }
}
