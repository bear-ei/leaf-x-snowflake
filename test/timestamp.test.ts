import * as assert from 'assert'
import { clockBack, newTimestamp, timestampEqual } from '../src/timestamp'

describe('test/timestamp.test.ts', () => {
  it('Should be the result of newTimestamp.', async () => {
    const result = newTimestamp()

    assert(typeof result === 'bigint')
  })

  it('Should be the result of timestampEqual.', async () => {
    const now = BigInt(Date.now())
    const result = timestampEqual({
      timestamp: now,
      lastTimestamp: now,
      sequence: BigInt(0),
      maxSequence: BigInt(0)
    })

    assert(typeof result === 'object')
    assert(typeof result.sequence === 'bigint')
    assert(typeof result.timestamp === 'bigint')
  })

  it('Should be the result of clockBack.', async () => {
    const now = Date.now()

    try {
      clockBack(BigInt(now - 1), BigInt(now))
    } catch (error) {
      assert(
        error.message ===
          'Clock moves backwards and rejects the ID generated for 1.'
      )
    }
  })
})
