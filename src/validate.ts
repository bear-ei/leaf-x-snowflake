import {ValidateId} from './interface/validate.interface';

export const validateId: ValidateId = ({id, maxId, message}) => {
  const isErrorId = id > maxId || id < 0;

  if (isErrorId) {
    throw new Error(message.replace('${maxId}', maxId.toString()));
  }
};
