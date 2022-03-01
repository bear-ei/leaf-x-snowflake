import * as assert from 'assert';
import {
  getTimestamp,
  handleClockCallback,
  handleTimestampEqual,
} from '../src/timestamp';

describe('test/timestamp.test.ts', () => {
  it('should be getting the timestamp', async () => {
    const result = getTimestamp();

    assert(typeof result === 'bigint');
  });

  it('should handle timestamp equality', async () => {
    const now = BigInt(Date.now());
    const result = handleTimestampEqual({
      timestamp: now,
      lastTimestamp: now,
      sequence: BigInt(0),
      maxSequence: BigInt(0),
    });

    assert(typeof result === 'object');
    assert(typeof result.sequence === 'bigint');
    assert(typeof result.timestamp === 'bigint');
  });

  it('should be handle clock callback', async () => {
    const now = Date.now();

    try {
      handleClockCallback(BigInt(now - 1), BigInt(now));
    } catch (error) {
      const relError = error as Record<string, unknown>;

      assert(
        relError.message ===
          'The clock moves backwards and refuses to generate an ID for 1.'
      );
    }
  });
});
