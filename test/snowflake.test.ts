import * as assert from 'assert';
import {snowflake} from '../src/snowflake';

let SNOWFLAKE!: () => string;

describe('test/snowflake.test.ts', () => {
  before(async () => {
    SNOWFLAKE = snowflake({twEpoch: Date.now()});
  });

  it('should be the snowflake algorithm', async () => {
    assert(typeof SNOWFLAKE === 'function');
  });

  it('should be the snowflake algorithm does not repeat', async () => {
    assert(
      [...new Set([...new Array(200000).keys()].map(() => SNOWFLAKE()))]
        .length === 200000
    );
  });
});
