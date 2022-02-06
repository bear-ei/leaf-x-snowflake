/**
 * Validate ID options.
 */
export interface ValidateIdOptions {
  /**
   *  Data center ID or Work machine ID.
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
 * Validate ID.
 *
 * @param options Validate ID options.
 */
export const validateId = ({id, maxId, message}: ValidateIdOptions) => {
  const isErrorId = id > maxId || id < 0;

  if (isErrorId) {
    throw new Error(message.replace('${maxId}', maxId.toString()));
  }
};
