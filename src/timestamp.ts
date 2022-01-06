/**
 * Get the next millisecond timestamp.
 *
 * @param timestamp Current timestamp.
 * @param lastTimestamp Last run time stamp.
 * @return bigint
 */
export interface GetNextMillisecond {
  (timestamp: bigint, lastTimestamp: bigint): bigint;
}

/**
 * Timestamp options.
 */
export interface TimestampOptions {
  /**
   * Current timestamp.
   */
  timestamp: bigint;

  /**
   * Last run time stamp.
   */
  lastTimestamp: bigint;

  /**
   * Memory sequence in milliseconds.
   */
  sequence: bigint;

  /**
   * Maximum memory sequence in milliseconds.
   */
  maxSequence: bigint;
}

/**
 * Timestamp result.
 */
export interface TimestampResult {
  /**
   * Current timestamp.
   */
  timestamp: bigint;

  /**
   * Memory sequence in milliseconds.
   */
  sequence: bigint;
}

/**
 * Check if the next millisecond timestamp is obtained.
 *
 * @param options: TimestampOptions
 * @return TimestampResult
 */
export interface CheckGetNextMillisecond {
  (options: TimestampOptions): TimestampResult;
}

/**
 * Get timestamp.
 *
 * @return bigint
 */
export interface GetTimestamp {
  (): bigint;
}

/**
 * Handle timestamps are equal.
 *
 * @param options TimestampOptions
 * @return TimestampResult
 */
export interface HandleTimestampEqual {
  (options: TimestampOptions): TimestampResult;
}

/**
 * Handle clock callbacks.
 *
 * @param timestamp bigint
 * @param lastTimestamp bigint
 * @return void | never
 */
export interface HandleClockCallback {
  (timestamp: bigint, lastTimestamp: bigint): void | never;
}

const getNextMillisecond: GetNextMillisecond = (timestamp, lastTimestamp) =>
  timestamp <= lastTimestamp
    ? getNextMillisecond(getTimestamp(), lastTimestamp)
    : timestamp;

const checkGetNextMillisecond: CheckGetNextMillisecond = ({
  timestamp,
  lastTimestamp,
  sequence,
  maxSequence,
}) => {
  const nextSequence = (sequence + BigInt(1)) & maxSequence;

  return nextSequence === BigInt(0)
    ? {
        timestamp: getNextMillisecond(timestamp, lastTimestamp),
        sequence: nextSequence,
      }
    : {timestamp, sequence: nextSequence};
};

export const getTimestamp: GetTimestamp = () => BigInt(Date.now());
export const handleTimestampEqual: HandleTimestampEqual = ({
  timestamp,
  lastTimestamp,
  ...args
}) =>
  timestamp === lastTimestamp
    ? checkGetNextMillisecond({timestamp, lastTimestamp, ...args})
    : {timestamp, sequence: BigInt(0)};

export const handleClockCallback: HandleClockCallback = (
  timestamp,
  lastTimestamp
) => {
  if (timestamp < lastTimestamp) {
    throw new Error(
      `The clock moves backwards and refuses to generate an ID for ${
        lastTimestamp - timestamp
      }.`
    );
  }
};
