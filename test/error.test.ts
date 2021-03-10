import * as assert from 'assert'
import { handleError } from '../src/error'

describe('test/error.test.ts', () => {
  it('Should be the result of handleError.', async () => {
    try {
      handleError('Internal service error.')
    } catch (error) {
      assert(error.message === 'Internal service error.')
    }
  })
})
