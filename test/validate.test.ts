import * as assert from 'assert'
import { validateId } from '../src/validate'

describe('test/validate.test.ts', () => {
  it('should be the result of the verification ID', async () => {
    try {
      validateId({
        id: BigInt(32),
        maxId: BigInt(31),
        message:
          'The data center ID cannot be greater than ${maxId} or less than 0.'
      })
    } catch (error) {
      assert(
        error.message ===
          'The data center ID cannot be greater than 31 or less than 0.'
      )
    }
  })
})
