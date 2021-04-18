import {
  CheckNextMillisecond,
  ClockBack,
  NewTimestamp,
  NextMillisecond,
  TimestampEqual
} from './interface/timestamp.interface'

const nextMillisecond: NextMillisecond = (timestamp, lastTimestamp) =>
  timestamp <= lastTimestamp
    ? nextMillisecond(newTimestamp(), lastTimestamp)
    : timestamp

const checkNextMillisecond: CheckNextMillisecond = ({
  timestamp,
  lastTimestamp,
  sequence,
  maxSequence
}) => {
  const nextSequence = (sequence + 1n) & maxSequence

  return nextSequence === 0n
    ? {
        timestamp: nextMillisecond(timestamp, lastTimestamp),
        sequence: nextSequence
      }
    : { timestamp, sequence: nextSequence }
}

export const newTimestamp: NewTimestamp = () => BigInt(Date.now())
export const timestampEqual: TimestampEqual = ({
  timestamp,
  lastTimestamp,
  ...args
}) =>
  timestamp === lastTimestamp
    ? checkNextMillisecond({ timestamp, lastTimestamp, ...args })
    : { timestamp, sequence: 0n }

export const clockBack: ClockBack = (timestamp, lastTimestamp) => {
  if (timestamp < lastTimestamp) {
    throw new Error(
      `Clock moves backwards and rejects the ID generated for ` +
        `${lastTimestamp - timestamp}.`
    )
  }
}
