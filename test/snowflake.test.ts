import * as assert from 'assert'
import * as sinon from 'sinon'
import * as error from '../src/error'
import { snowflake } from '../src/snowflake'
import * as validate from '../src/validate'

describe('test/snowflake..test.ts', () => {
  it('Should be the result of snowflake.', async () => {
    sinon.stub(validate, 'validateId').returns()
    sinon.stub(error, 'handleError').returns()

    const result = snowflake({ twEpoch: Date.now() })

    assert(typeof result === 'function')

    sinon.restore()
  })

  it('Should be the result of snowflakes not repeating.', async () => {
    const generateId = snowflake({ twEpoch: Date.now() })

    assert(
      [...new Set([...new Array(200000).keys()].map(() => generateId()))]
        .length === 200000
    )
  })
})
