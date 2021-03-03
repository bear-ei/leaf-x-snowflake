'use strict'

/**
 * 雪花算法选项
 */
export interface SnowflakeOptions {
  /**
   * 数据中心id
   * 取值范围 0 - 31
   */
  dataCenterId?: number

  /**
   * 工作机器id
   * 取值范围 0 - 31
   */
  workerId?: number

  /**
   * 雪花算法开始的纪元时间
   */
  twEpoch: number
}

/**
 * 雪花算法函数
 */
export interface SnowflakeFunction {
  (options: SnowflakeOptions): () => string
}

/**
 * 验证id选项
 */
export interface ValidateIdOptions {
  /**
   * 数据中心id或工作机器id
   */
  id: bigint

  /**
   * 最大id范围
   */
  maxId: bigint

  /**
   * 验证失败抛出的错误信息
   */
  errorMessage: string
}

/**
 * 验证id
 */
export interface ValidateIdFunction {
  (options: ValidateIdOptions): string | undefined
}

/**
 * 处理错误
 */
export interface HandleErrorFunction {
  (message?: string): never | void
}

/**
 * 获取新时间戳
 */
export interface GetNewTimestampFunction {
  (): bigint
}

/**
 * 处理时钟回拨
 *
 * @param timestamp         当前时间戳
 * @param lastTimestamp     最后一次运行时间戳
 */
export interface HandleClockBackFunction {
  (timestamp: bigint): (lastTimestamp: bigint) => string | undefined
}

/**
 * 处理时间戳选项
 */
export interface HandleTimestampOptions {
  /**
   * 当前时间戳
   */
  timestamp: bigint

  /**
   * 最后一次运行时间戳
   */
  lastTimestamp: bigint

  /**
   * 毫秒内序列
   */
  sequence: bigint

  /**
   * 毫秒内最大序列
   */
  maxSequence: bigint
}

/**
 * 处理时间戳结果
 */
export interface HandleTimestampResult {
  /**
   * 时间戳
   */
  timestamp: bigint

  /**
   * 毫秒内序列
   */
  sequence: bigint
}

/**
 * 是否进入一个毫秒
 */
export interface IsNextMillisecondFunction {
  (options: HandleTimestampOptions): HandleTimestampResult
}

/**
 * 获取下一个毫秒时间戳
 *
 * @param timestamp         当前时间戳
 * @param lastTimestamp     最后一次运行时间戳
 */
export interface GetNextMillisecondFunction {
  (timestamp: bigint, lastTimestamp: bigint): bigint
}

/**
 * 处理时间戳相等
 */
export interface HandleTimestampEqualFunction {
  (options: HandleTimestampOptions): HandleTimestampResult
}

/**
 * 生成id选项
 */
export interface GenerateIdOptions {
  /**
   * 雪花算法开始的纪元时间
   */
  twEpoch: bigint

  /**
   * 时间戳左偏移
   */
  timestampLeftShift: bigint

  /**
   * 数据中心id
   * 取值范围 0 - 31
   */
  dataCenterId: bigint

  /**
   * 数据中心左偏移
   */
  dataCenterLeftShift: bigint

  /**
   * 工作机器id
   * 取值范围 0 - 31
   */
  workerId: bigint

  /**
   * 工作机器左偏移
   */
  workerLeftShift: bigint
}

/**
 * 生成id结果
 */
export interface GenerateIdResult {
  /**
   * 新id
   */
  id: bigint

  /**
   * 最后一次运行时间戳
   */
  lastTimestamp: bigint

  /**
   * 毫秒内序列
   */
  sequence: bigint
}

/**
 * 生成新id
 */
export interface GenerateIdFunction {
  (options: GenerateIdOptions): (HandleTimeResult: HandleTimestampResult) => GenerateIdResult
}
