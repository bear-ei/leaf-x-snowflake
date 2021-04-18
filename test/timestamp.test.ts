import * as assert from 'assert'
import {
  getNewTimestamp,
  handleClockCallback,
  handleTimestampEqual
} from '../src/timestamp'

describe('test/timestamp.test.ts', () => {
  it('Should be the result of generating a new timestamp.', async () => {
    const result = getNewTimestamp()

    assert(typeof result === 'bigint')
  })

  it('Should be the result of handle timestamp equality.', async () => {
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

  it('Should be the result of handle clock callbacks.', async () => {
    const now = Date.now()

    try {
      handleClockCallback(BigInt(now - 1), BigInt(now))
    } catch (error) {
      assert(
        error.message ===
          'Clock moves backwards and rejects the ID generated for 1.'
      )
    }
  })
})
