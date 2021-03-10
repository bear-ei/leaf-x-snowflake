import { HandleErrorFunction } from './interface/error'

export const handleError: HandleErrorFunction = (message) => {
  if (message) {
    throw new Error(message)
  }
}
