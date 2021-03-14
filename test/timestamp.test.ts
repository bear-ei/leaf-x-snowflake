import * as assert from 'assert'
import * as sinon from 'sinon'
import * as timestamp from '../src/timestamp'

const {
  getTimestamp,
  nextMillisecond,
  getNextMillisecond,
  handleTimestampEqual,
  handleClockBack
} = timestamp

describe('test/timestamp.test.ts', () => {
  it('Should be the result of getTimestamp.', async () => {
    const result = getTimestamp()

    assert(typeof result === 'bigint')
  })

  it('Should be the result of nextMillisecond.', async () => {
    const now = BigInt(Date.now())

    sinon.stub(timestamp, 'getNextMillisecond').returns(now)

    const result = nextMillisecond({
      timestamp: now,
      lastTimestamp: now,
      sequence: BigInt(0),
      maxSequence: BigInt(0)
    })

    sinon.restore()

    assert(typeof result === 'object')
    assert(typeof result.sequence === 'bigint')
    assert(typeof result.timestamp === 'bigint')
  })

  it('Should be the result of getNextMillisecond.', async () => {
    const now = BigInt(Date.now())

    sinon.stub(timestamp, 'getTimestamp').returns(now + BigInt(1))

    const result = getNextMillisecond(now, now)

    sinon.restore()

    assert(typeof result === 'bigint')
  })

  it('Should be the result of handleTimestampEqual.', async () => {
    const now = BigInt(Date.now())

    sinon.stub(timestamp, 'nextMillisecond').returns({
      timestamp: now,
      sequence: BigInt(0)
    })

    const result = handleTimestampEqual({
      timestamp: now,
      lastTimestamp: now,
      sequence: BigInt(0),
      maxSequence: BigInt(0)
    })

    sinon.restore()

    assert(typeof result === 'object')
    assert(typeof result.sequence === 'bigint')
    assert(typeof result.timestamp === 'bigint')
  })

  it('Should be the result of handleClockBack.', async () => {
    const now = Date.now()

    try {
      handleClockBack(BigInt(now - 1))(BigInt(now))
    } catch (error) {
      assert(
        error.message ===
          'The clock moves backwards and rejects the id generated for 1.'
      )
    }
  })
})
