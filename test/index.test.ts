import * as assert from 'assert'
import * as sinon from 'sinon'
import * as client from '../src'
;('use strict')

const {
  generateId,
  getNewTimestamp,
  getNextMillisecond,
  handleClockBack,
  handleError,
  handleTimestampEqual,
  isNextMillisecond,
  snowflake,
  validateId
} = client

describe('test/snowflake.test.ts', () => {
  it('Should be the result of validateId.', async () => {
    const result = validateId({
      id: BigInt(3),
      maxId: BigInt(2),
      errorMessage: 'Data center id can not be greater than ${maxId} or less than 0.'
    })

    assert(result === 'Data center id can not be greater than 2 or less than 0.')
  })

  it('Should be the result of handleClockBack.', async () => {
    const now = Date.now()
    const result = handleClockBack(BigInt(now - 1))(BigInt(now))

    assert(result === 'Clock moves backwards to reject the id generated for 1.')
  })

  it('Should be the result of isNextMillisecond.', async () => {
    const now = BigInt(Date.now())

    sinon.stub(client, 'getNextMillisecond').returns(now)

    const result = isNextMillisecond({
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

  it('Should be the result of handleTimestampEqual.', async () => {
    const now = BigInt(Date.now())

    sinon.stub(client, 'isNextMillisecond').returns({
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

  it('Should be the result of getNextMillisecond.', async () => {
    const now = BigInt(Date.now())

    sinon.stub(client, 'getNewTimestamp').returns(BigInt(Date.now() + 1))

    const result = getNextMillisecond(now, now)

    assert(typeof result === 'bigint')

    sinon.restore()
  })

  it('Should be the result of getNewTimestamp.', async () => {
    const result = getNewTimestamp()

    assert(typeof result === 'bigint')
  })

  it('Should be the result of generateId.', async () => {
    const now = BigInt(Date.now())
    const result = generateId({
      twEpoch: now,
      timestampLeftShift: BigInt(22),
      dataCenterId: BigInt(0),
      dataCenterLeftShift: BigInt(17),
      workerId: BigInt(0),
      workerLeftShift: BigInt(12)
    })({ timestamp: now, sequence: BigInt(0) })

    assert(typeof result === 'object')
    assert(typeof result.id === 'bigint')
    assert(typeof result.lastTimestamp === 'bigint')
    assert(typeof result.sequence === 'bigint')
  })

  it('Should be the result of handleError.', async () => {
    try {
      handleError('error')
    } catch (error) {
      assert(error.message === 'error')
    }
  })

  it('Should be the result of snowflake.', async () => {
    const generateId = snowflake({ twEpoch: Date.now() })

    assert([...new Set([...new Array(200000).keys()].map(() => generateId()))].length === 200000)
  })
})
