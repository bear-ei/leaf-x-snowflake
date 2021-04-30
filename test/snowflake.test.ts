import * as assert from 'assert'
import { snowflake } from '../src/snowflake'

describe('test/snowflake.test.ts', () => {
  it('should be the result of the snow algorithm', async () => {
    const result = snowflake({ twEpoch: Date.now() })

    assert(typeof result === 'function')
  })

  it('should be the result of the snowflake algorithm to generate non-repetition ID', async () => {
    const generateId = snowflake({ twEpoch: Date.now() })

    assert(
      [...new Set([...new Array(200000).keys()].map(() => generateId()))]
        .length === 200000
    )
  })
})
