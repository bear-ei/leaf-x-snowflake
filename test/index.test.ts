import { curry, equals, is, compose, length, map, uniq } from 'ramda'
import * as assert from 'assert'
import {
  generateId,
  getNewTimestamp,
  nextMillisecond,
  handleClockBack,
  handleError,
  handleTimestampEqual,
  isNextMillisecond,
  snowflake,
  validateId
} from '../src'
;('use strict')

describe('test/snowflake.test.ts', () => {
  it('Should be the result of validateId', async () => {
    const result = validateId({
      id: BigInt(3),
      maxId: BigInt(2),
      errorMessage: 'Data center id can not be greater than ${maxId} or less than 0.'
    })

    assert(equals(result, 'Data center id can not be greater than 2 or less than 0.'))
  })

  it('Should be the result of handleClockBack', async () => {
    const result = curry(handleClockBack)(BigInt(1))(BigInt(2))

    assert(equals(result, 'Clock moves backwards to reject the id generated for 1.'))
  })

  it('Should be the result of handleTimestampEqual', async () => {
    const result = handleTimestampEqual({
      timestamp: BigInt(1),
      lastTimestamp: BigInt(1),
      sequence: BigInt(0),
      maxSequence: BigInt(0)
    })

    assert(is(Object)(result))
    assert(is(BigInt)(result.sequence))
    assert(is(BigInt)(result.timestamp))
  })

  it('Should be the result of isNextMillisecond', async () => {
    const result = isNextMillisecond({
      timestamp: BigInt(1),
      lastTimestamp: BigInt(1),
      sequence: BigInt(0),
      maxSequence: BigInt(0)
    })

    assert(is(Object)(result))
    assert(is(BigInt)(result.sequence))
    assert(is(BigInt)(result.timestamp))
  })

  it('Should be the result of getNextMillisecond', async () => {
    const now = BigInt(Date.now())
    const result = curry(nextMillisecond)(now)(now)

    assert(is(BigInt)(result))
  })

  it('Should be the result of getNewTimestamp', async () => {
    const result = getNewTimestamp()

    assert(is(BigInt)(result))
  })

  it('Should be the result of generateId', async () => {
    const result = generateId({
      twEpoch: BigInt(1583734327332),
      timestampLeftShift: BigInt(22),
      dataCenterId: BigInt(0),
      dataCenterLeftShift: BigInt(17),
      workerId: BigInt(0),
      workerLeftShift: BigInt(12)
    })({ timestamp: BigInt(1609430400000), sequence: BigInt(0) })

    assert(is(Object)(result))
    assert(is(BigInt)(result.id))
    assert(is(BigInt)(result.lastTimestamp))
    assert(is(BigInt)(result.sequence))
  })

  it('Should be the result of handleError', async () => {
    try {
      handleError('error')
    } catch (error) {
      assert(error.message === 'error')

      assert(equals('error')(error.message))
    }
  })

  it('Should be the result of snowflake', async () => {
    const generateId = snowflake({
      twEpoch: 1577808000000
    })

    const ids = compose(
      uniq,
      map(() => generateId())
    )([...new Array(200000).keys()])

    assert(equals(length(ids), 200000))
  })
})
