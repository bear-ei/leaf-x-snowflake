import * as assert from 'assert'
import { handleClockBack } from '../src/clockBack'

describe('test/clockBack.test.ts', () => {
  it('Should be the result of handleClockBack.', async () => {
    const now = Date.now()
    const result = handleClockBack(BigInt(now - 1))(BigInt(now))

    assert(
      result === 'The clock moves backwards and rejects the id generated for 1.'
    )
  })
})
