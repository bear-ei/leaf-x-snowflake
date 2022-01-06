/**
 * The options to validate the ID.
 */
export interface ValidateIdOptions {
  /**
   * Data center ID or work machine ID.
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
 * @param options ValidateIdOptions
 * @return void | never
 */
export interface ValidateId {
  (options: ValidateIdOptions): void | never;
}

export const validateId: ValidateId = ({id, maxId, message}) => {
  const isErrorId = id > maxId || id < 0;

  if (isErrorId) {
    throw new Error(message.replace('${maxId}', maxId.toString()));
  }
};
