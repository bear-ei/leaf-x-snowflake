import { ValidateIdFunction } from './interface/validate.interface'

export const validateId: ValidateIdFunction = ({ id, maxId, errorMessage }) => {
  const errorId = id > maxId || id < 0

  if (errorId) {
    throw new Error(errorMessage.replace('${maxId}', maxId.toString()))
  }
}
