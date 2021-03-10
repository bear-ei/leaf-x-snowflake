'use strict'

import * as assert from 'assert'
import * as sinon from 'sinon'
import * as timestamp from '../src/timestamp'

const {
  getTimestamp,
  nextMillisecond,
  getNextMillisecond,
  handleTimestampEqual
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

    assert(typeof result === 'object')
    assert(typeof result.sequence === 'bigint')
    assert(typeof result.timestamp === 'bigint')

    sinon.restore()
  })

  it('Should be the result of getNextMillisecond.', async () => {
    const now = BigInt(Date.now())

    sinon.stub(timestamp, 'getTimestamp').returns(now + BigInt(1))

    const result = getNextMillisecond(now, now)

    assert(typeof result === 'bigint')

    sinon.restore()
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

    assert(typeof result === 'object')
    assert(typeof result.sequence === 'bigint')
    assert(typeof result.timestamp === 'bigint')

    sinon.restore()
  })
})
