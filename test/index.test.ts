import * as assert from 'assert'
import {
  generateId,
  getNewTimestamp,
  getNextMillisecond,
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
      errorMessage:
        'Data center id can not be greater than ${maxId} or less than 0.'
    })

    assert(
      result === 'Data center id can not be greater than 2 or less than 0.'
    )
  })

  it('Should be the result of clockBack', async () => {
    const result = handleClockBack(BigInt(1))(BigInt(2))

    assert(result === 'Clock moves backwards to reject the id generated for 1.')
  })

  it('Should be the result of timestampEqual', async () => {
    const results = handleTimestampEqual({
      timestamp: BigInt(1),
      lastTimestamp: BigInt(1),
      sequence: BigInt(0),
      maxSequence: BigInt(0)
    })

    assert(typeof results === 'object')
    assert(typeof results.sequence === 'bigint')
    assert(typeof results.timestamp === 'bigint')
  })

  it('Should be the result of isNextMillisecond', async () => {
    const results = isNextMillisecond({
      timestamp: BigInt(1),
      lastTimestamp: BigInt(1),
      sequence: BigInt(0),
      maxSequence: BigInt(0)
    })

    assert(typeof results === 'object')
    assert(typeof results.sequence === 'bigint')
    assert(typeof results.timestamp === 'bigint')
  })

  it('Should be the result of nextMillisecond', async () => {
    const now = BigInt(Date.now())
    const result = getNextMillisecond(now)(now)

    assert(typeof result === 'bigint')
  })

  it('Should be the result of newTimestamp', async () => {
    const result = getNewTimestamp()

    assert(typeof result === 'bigint')
  })

  it('Should be the result of generateId', async () => {
    const results = generateId({
      twEpoch: BigInt(1583734327332),
      timestampLeftShift: BigInt(22),
      dataCenterId: BigInt(0),
      dataCenterLeftShift: BigInt(17),
      workerId: BigInt(0),
      workerLeftShift: BigInt(12)
    })({ timestamp: BigInt(1609430400000), sequence: BigInt(0) })

    assert(typeof results === 'object')
    assert(typeof results.id === 'bigint')
    assert(typeof results.lastTimestamp === 'bigint')
    assert(typeof results.sequence === 'bigint')
  })

  it('Should be the result of error', async () => {
    try {
      handleError('error')
    } catch (error) {
      assert(error.message === 'error')
    }
  })

  it('Should be the result of snowflake', async () => {
    const generateId = snowflake({
      twEpoch: 1577808000000
    })

    assert(
      [...new Set([...new Array(200000).keys()].map(() => generateId()))]
        .length === 200000
    )
  })
})
