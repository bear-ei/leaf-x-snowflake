import { ValidateIdFunction } from './interface/validate'

export const validateId: ValidateIdFunction = ({ id, maxId, errorMessage }) => {
  const errorId = id > maxId || id < 0

  if (errorId) {
    return errorMessage.replace('${maxId}', maxId.toString())
  }
}
