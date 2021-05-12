export * from './id';
export * from './interface/id.interface';
export * from './interface/snowflake.interface';
export * from './interface/timestamp.interface';
export * from './interface/validate.interface';
export * from './timestamp';
export * from './validate';
export {snowflake};
import {snowflake as relSnowflake} from './snowflake';

const snowflake = relSnowflake;
