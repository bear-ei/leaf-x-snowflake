import { ValidateId } from './interface/validate.interface'

export const validateId: ValidateId = ({ id, maxId, message }) => {
  const errorId = id > maxId || id < 0

  if (errorId) {
    throw new Error(message.replace('${maxId}', maxId.toString()))
  }
}
