import * as assert from 'assert'
import { generateId } from '../src/id'

describe('test/id.test.ts', () => {
  it('Should be the result of generateId.', async () => {
    const now = BigInt(Date.now())
    const result = generateId({
      twEpoch: now,
      timestampLeftShift: BigInt(22),
      dataCenterId: BigInt(0),
      dataCenterLeftShift: BigInt(17),
      machineId: BigInt(0),
      machineLeftShift: BigInt(12)
    })({ timestamp: now, sequence: BigInt(0) })

    assert(typeof result === 'object')
    assert(typeof result.id === 'bigint')
    assert(typeof result.lastTimestamp === 'bigint')
    assert(typeof result.sequence === 'bigint')
  })
})
