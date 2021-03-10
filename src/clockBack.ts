import { HandleClockBackFunction } from './interface/clockBack'

export const handleClockBack: HandleClockBackFunction = (timestamp) => (
  lastTimestamp
) => {
  if (timestamp < lastTimestamp) {
    return (
      `The clock moves backwards and rejects the id generated for ` +
      `${lastTimestamp - timestamp}.`
    )
  }
}
