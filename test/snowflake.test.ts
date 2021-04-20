import * as assert from 'assert'
import { snowflake } from '../src/snowflake'

describe('test/snowflake.test.ts', () => {
  it('Should be the result of the snowflake algorithm.', async () => {
    const result = snowflake({ twEpoch: Date.now() })

    assert(typeof result === 'function')
  })

  it('Should be the result of the non-repeating snowflake algorithm.', async () => {
    const generateId = snowflake({ twEpoch: Date.now() })

    assert(
      [...new Set([...new Array(200000).keys()].map(() => generateId()))]
        .length === 200000
    )
  })
})
