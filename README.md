# Snowflake

Twitter snowflake algorithm, using TypeScript implementation.

## Installation

> npm install @leaf-x/snowflake --save

## Parameters

| Name         | Type   | Default Value | Description                                       |
| :----------- | :----- | :------------ | :------------------------------------------------ |
| dataCenterId | Number | 0             | Data center ID, value range 0 -31.                |
| workId       | Number | 0             | Working machine ID, value range 0 - 31.           |
| twEpoch      | Number | Required      | Generate the start timestamp of the snowflake ID. |

## Usage

```typescript
import * as snowflake from '@leaf-x/snowflake'

const generateId = snowflake({
  dataCenterId: 0,
  workId: 0,
  twEpoch: 1583734327332
})

const id = generateId()

console.info(id)
```
