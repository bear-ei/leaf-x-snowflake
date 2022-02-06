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
 * Next millisecond timestamp.
 *
 * @param timestamp Current timestamp.
 * @param lastTimestamp Last run time stamp.
 */
const nextMillisecond = (timestamp: bigint, lastTimestamp: bigint): bigint =>
  timestamp <= lastTimestamp
    ? nextMillisecond(getTimestamp(), lastTimestamp)
    : timestamp;

/**
 * Check the next millisecond timestamp.
 *
 * @param options Timestamp options.
 */
const checkNextMillisecond = ({
  timestamp,
  lastTimestamp,
  sequence,
  maxSequence,
}: TimestampOptions) => {
  const nextSequence = (sequence + BigInt(1)) & maxSequence;

  return nextSequence === BigInt(0)
    ? {
        timestamp: nextMillisecond(timestamp, lastTimestamp),
        sequence: nextSequence,
      }
    : {timestamp, sequence: nextSequence};
};

/**
 * Get timestamp.
 */
export const getTimestamp = () => BigInt(Date.now());

/**
 * Handle timestamps are equal.
 *
 * @param options Timestamp options.
 */
export const handleTimestampEqual = ({
  timestamp,
  lastTimestamp,
  ...args
}: TimestampOptions) =>
  timestamp === lastTimestamp
    ? checkNextMillisecond({timestamp, lastTimestamp, ...args})
    : {timestamp, sequence: BigInt(0)};

/**
 * Handle clock callbacks.
 *
 * @param timestamp Current timestamp.
 * @param lastTimestamp Last run time stamp.
 */
export const handleClockCallback = (
  timestamp: bigint,
  lastTimestamp: bigint
) => {
  if (timestamp < lastTimestamp) {
    throw new Error(
      `The clock moves backwards and refuses to generate an ID for ${
        lastTimestamp - timestamp
      }.`
    );
  }
};
