import * as assert from 'assert'
import {
  getNewTimestamp,
  handleClockCallback,
  handleTimestampEqual
} from '../src/timestamp'

describe('test/timestamp.test.ts', () => {
  it('should be the result of getting new timestamp', async () => {
    const result = getNewTimestamp()

    assert(typeof result === 'bigint')
  })

  it('should be the result of handle equal timestamps', async () => {
    const now = BigInt(Date.now())
    const result = handleTimestampEqual({
      timestamp: now,
      lastTimestamp: now,
      sequence: BigInt(0),
      maxSequence: BigInt(0)
    })

    assert(typeof result === 'object')
    assert(typeof result.sequence === 'bigint')
    assert(typeof result.timestamp === 'bigint')
  })

  it('should be the result of handle the clock callback', async () => {
    const now = Date.now()

    try {
      handleClockCallback(BigInt(now - 1), BigInt(now))
    } catch (error) {
      assert(
        error.message ===
          'The clock moves backwards and refuses to generate an ID for 1.'
      )
    }
  })
})
