'use strict'

import * as assert from 'assert'
import { snowflake } from '../src/snowflake'

describe('test/index.test.ts', () => {
  it('Should be the result of snowflake.', async () => {
    const generateId = snowflake({ twEpoch: Date.now() })

    assert(
      [...new Set([...new Array(200000).keys()].map(() => generateId()))]
        .length === 200000
    )
  })
})
