import {
  CheckGetNextMillisecondFunction,
  GetNextMillisecondFunction,
  GetTimestampFunction,
  HandleClockBackFunction,
  HandleTimestampEqualFunction
} from './interface/timestamp'

export const getTimestamp: GetTimestampFunction = () => BigInt(Date.now())
export const checkGetNextMillisecond: CheckGetNextMillisecondFunction = ({
  timestamp,
  lastTimestamp,
  sequence,
  maxSequence
}) => {
  const nextSequence = (sequence + 1n) & maxSequence

  return nextSequence === 0n
    ? {
        timestamp: getNextMillisecond(timestamp, lastTimestamp),
        sequence: nextSequence
      }
    : { timestamp, sequence: nextSequence }
}

export const getNextMillisecond: GetNextMillisecondFunction = (
  timestamp,
  lastTimestamp
) =>
  timestamp <= lastTimestamp
    ? getNextMillisecond(getTimestamp(), lastTimestamp)
    : timestamp

export const handleTimestampEqual: HandleTimestampEqualFunction = ({
  timestamp,
  lastTimestamp,
  ...args
}) =>
  timestamp === lastTimestamp
    ? checkGetNextMillisecond({ timestamp, lastTimestamp, ...args })
    : { timestamp, sequence: 0n }

export const handleClockBack: HandleClockBackFunction = (
  timestamp,
  lastTimestamp
) => {
  if (timestamp < lastTimestamp) {
    throw new Error(
      `The clock moves backwards and rejects the ID generated for ` +
        `${lastTimestamp - timestamp}.`
    )
  }
}
