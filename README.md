# Snowflake

Twitter snowflake algorithm, using TypeScript implementation.

## Installation

> npm install @leaf-x/snowflake --save

## Parameters

| Name         | Type   | Default Value | Description      |
| :----------- | :----- | :------------ | :--------------- |
| dataCenterId | Number | 0             | Data center id.  |
| workerId    | Number | 0             | Work machine id. |
| twEpoch      | Number | Required      | Start timestamp. |

## Usage

```typescript
import * as snowflake from '@leaf-x/snowflake'

const generateId = snowflake({
  dataCenterId: 0,
  workerId: 0,
  twEpoch: 1583734327332
})

const id = generateId()

console.info(id)
```
