import * as assert from 'assert'
import { handleErrorMessage } from '../src/error'

describe('test/error.test.ts', () => {
  it('Should be the result of handleErrorMessage.', async () => {
    try {
      handleErrorMessage('Internal service error.')
    } catch (error) {
      assert(error.message === 'Internal service error.')
    }
  })
})
