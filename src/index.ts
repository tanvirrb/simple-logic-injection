import { ILogicInjection } from '@app/interfaces/logicInjection.interface';

class LogicInjector<TArgs extends any[] = any[], TResult = any>
  implements ILogicInjection<TArgs, TResult>
{
  private readonly logicMap: Map<string, (...args: TArgs) => TResult>;

  constructor() {
    this.logicMap = new Map();
  }

  /**
   * Register a logic function
   * @param key
   * @param logicFunction
   */
  registerLogic(
    key: string,
    logicFunction: (...args: TArgs) => TResult,
  ): Map<string, (...args: TArgs) => TResult> {
    this.logicMap.set(key, logicFunction);
    return this.logicMap;
  }

  /**
   * Execute a logic function
   * @param key
   * @param args
   */
  executeLogic(key: string, ...args: TArgs): TResult {
    if (!this.logicMap.has(key)) {
      throw new Error(`Logic with key "${key}" not found`);
    }
    return this.logicMap.get(key)!(...args);
  }

  /**
   * Unregister a logic function
   * @param key
   */
  unregisterLogic(key: string): boolean {
    return this.logicMap.delete(key);
  }

  /**
   * Get the logic map
   */
  getLogicMap(): Map<string, (...args: TArgs) => TResult> {
    return this.logicMap;
  }
}

export default LogicInjector;
