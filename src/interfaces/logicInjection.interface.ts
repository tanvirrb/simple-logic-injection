export interface ILogicInjection<TArgs extends any[] = any[], TResult = any> {
  registerLogic(
    key: string,
    logicFunction: (...args: TArgs) => TResult,
  ): Map<string, (...args: TArgs) => TResult>;

  executeLogic(key: string, ...args: TArgs): TResult;

  unregisterLogic(key: string): boolean;

  getLogicMap(): Map<string, (...args: TArgs) => TResult>;
}
