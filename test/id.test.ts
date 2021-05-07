import * as assert from 'assert'
import { initGenerateNewId } from '../src/id'

describe('test/id.test.ts', () => {
  it('should be the result of generating new ID', async () => {
    const now = BigInt(Date.now())
    const result = initGenerateNewId({
      twEpoch: now,
      timestampLeftShift: BigInt(22),
      dataCenterId: BigInt(0),
      dataCenterLeftShift: BigInt(17),
      workMachineId: BigInt(0),
      workMachineLeftShift: BigInt(12)
    })({ timestamp: now, sequence: BigInt(0) })

    assert(typeof result === 'object')
    assert(typeof result.id === 'bigint')
    assert(typeof result.lastTimestamp === 'bigint')
    assert(typeof result.sequence === 'bigint')
  })
})
