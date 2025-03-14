import { ILogicInjection } from '@app/interfaces/logicInjection.interface';
import {
  LogicInjectionError,
  LogicInjectionErrorType,
} from './utils/LogicInjectionError';
import { LogicFunction, LogicMap } from './types/logic';

class LogicInjector<TArgs extends any[] = any[], TResult = any>
  implements ILogicInjection<TArgs, TResult>
{
  private readonly logicMap: LogicMap<TArgs, TResult>;

  constructor() {
    this.logicMap = new Map();
  }

  private validateKey(key: string): void {
    if (typeof key !== 'string' || key.trim().length === 0) {
      throw new LogicInjectionError(LogicInjectionErrorType.INVALID_KEY, key);
    }
  }

  private validateLogicFunction(
    logicFunction: unknown,
  ): asserts logicFunction is LogicFunction<TArgs, TResult> {
    if (typeof logicFunction !== 'function') {
      throw new LogicInjectionError(
        LogicInjectionErrorType.INVALID_FUNCTION,
        'unknown',
      );
    }
  }

  /**
   * Register a logic function
   * @param key - Unique identifier for the logic function
   * @param logicFunction - The function to register
   * @throws {LogicInjectionError} When the key is invalid, the logic function is invalid, or the key already exists
   */
  register(
    key: string,
    logicFunction: LogicFunction<TArgs, TResult>,
  ): LogicMap<TArgs, TResult> {
    this.validateKey(key);
    this.validateLogicFunction(logicFunction);

    if (this.logicMap.has(key)) {
      throw new LogicInjectionError(LogicInjectionErrorType.DUPLICATE_KEY, key);
    }

    this.logicMap.set(key, logicFunction);
    return this.logicMap;
  }

  /**
   * Execute a logic function
   * @param key - The key of the logic function to execute
   * @param args - Arguments to pass to the logic function
   * @throws {LogicInjectionError} When the logic function is not found or the key is invalid
   */
  execute(key: string, ...args: TArgs): TResult {
    this.validateKey(key);
    const logicFunction = this.logicMap.get(key);
    if (!logicFunction) {
      throw new LogicInjectionError(LogicInjectionErrorType.NOT_FOUND, key);
    }
    return logicFunction(...args);
  }

  /**
   * Unregister a logic function
   * @param key - The key of the logic function to unregister
   * @throws {LogicInjectionError} When the key is invalid
   */
  unregister(key: string): boolean {
    this.validateKey(key);
    return this.logicMap.delete(key);
  }

  /**
   * Get a logic function
   * @param key - The key of the logic function to retrieve
   * @throws {LogicInjectionError} When the logic function is not found or the key is invalid
   */
  get(key: string): LogicFunction<TArgs, TResult> {
    this.validateKey(key);
    const logicFunction = this.logicMap.get(key);
    if (!logicFunction) {
      throw new LogicInjectionError(LogicInjectionErrorType.NOT_FOUND, key);
    }
    return logicFunction;
  }

  /**
   * Get the logic map
   */
  getLogicList(): LogicMap<TArgs, TResult> {
    return this.logicMap;
  }
}

export default LogicInjector;
