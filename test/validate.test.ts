import * as assert from 'assert'
import { validateId } from '../src/validate'

describe('test/validate.test.ts', () => {
  it('Should be the result of validateId.', async () => {
    const result = validateId({
      id: BigInt(32),
      maxId: BigInt(31),
      errorMessage:
        'The data center id cannot be greater than ${maxId} or less than 0.'
    })

    assert(
      result === 'The data center id cannot be greater than 31 or less than 0.'
    )
  })
})
