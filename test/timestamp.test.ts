import * as assert from 'assert'
import {
  getNewTimestamp,
  processClockCallback,
  processTimestampEqual
} from '../src/timestamp'

describe('test/timestamp.test.ts', () => {
  it('should be the result of obtaining a new timestamp', async () => {
    const result = getNewTimestamp()

    assert(typeof result === 'bigint')
  })

  it('should be the result of processing equal timestamps', async () => {
    const now = BigInt(Date.now())
    const result = processTimestampEqual({
      timestamp: now,
      lastTimestamp: now,
      sequence: BigInt(0),
      maxSequence: BigInt(0)
    })

    assert(typeof result === 'object')
    assert(typeof result.sequence === 'bigint')
    assert(typeof result.timestamp === 'bigint')
  })

  it('should be the result of processing clock callback', async () => {
    const now = Date.now()

    try {
      processClockCallback(BigInt(now - 1), BigInt(now))
    } catch (error) {
      assert(
        error.message ===
          'The clock moves backwards, refuses to generate IDs for 1.'
      )
    }
  })
})
