import {
  CheckGetNextMillisecond,
  GetNewTimestamp,
  GetNextMillisecond,
  ProcessClockCallback,
  ProcessTimestampEqual
} from './interface/timestamp.interface'

const getNextMillisecond: GetNextMillisecond = (timestamp, lastTimestamp) =>
  timestamp <= lastTimestamp
    ? getNextMillisecond(getNewTimestamp(), lastTimestamp)
    : timestamp

const checkGetNextMillisecond: CheckGetNextMillisecond = ({
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

export const getNewTimestamp: GetNewTimestamp = () => BigInt(Date.now())
export const processTimestampEqual: ProcessTimestampEqual = ({
  timestamp,
  lastTimestamp,
  ...args
}) =>
  timestamp === lastTimestamp
    ? checkGetNextMillisecond({ timestamp, lastTimestamp, ...args })
    : { timestamp, sequence: 0n }

export const processClockCallback: ProcessClockCallback = (
  timestamp,
  lastTimestamp
) => {
  if (timestamp < lastTimestamp) {
    throw new Error(
      `The clock moves backwards, refuses to generate IDs for ${
        lastTimestamp - timestamp
      }.`
    )
  }
}
