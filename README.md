# Snowflake

Twitter snowflake algorithm, TypeScript implementation.

## Installation

> npm install @leaf-x/snowflake --save

## Parameters

| Name         | Type   | Default Value | Description                                        |
| :----------- | :----- | :------------ | :------------------------------------------------- |
| dataCenterId | Number | 0             | Data center ID, value range 0 -31.                 |
| workId       | Number | 0             | Working machine ID, value range 0 - 31.            |
| twEpoch      | Number | Required      | Timestamp of the start of the snowflake algorithm. |

## Usage

```typescript
import * as snowflake from '@leaf-x/snowflake'

const newId = snowflake({
  dataCenterId: 0,
  workId: 0,
  twEpoch: 1583734327332
})

const id = newId()

console.info(id)
```
