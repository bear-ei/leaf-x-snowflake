# Snowflake

Twitter snowflake algorithm, TypeScript implementation.

## Installation

> npm install @leaf-x/snowflake --save

## Parameters

| Name          | Type   | Default Value | Description                                     |
| :------------ | :----- | :------------ | :---------------------------------------------- |
| dataCenterId  | Number | 0             | Data center ID, value range 0-31.               |
| workMachineId | Number | 0             | Work machine ID, the value range 0-31.          |
| twEpoch       | Number | Required      | The start timestamp of the snowflake algorithm. |

## Use

```typescript
import {snowflake} from '@leaf-x/snowflake';

const newId = snowflake({
  dataCenterId: 0,
  workMachineId: 0,
  twEpoch: 1583734327332,
});

const id = newId();

console.info(id);
```
