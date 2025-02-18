export interface ILogicInjection<TArgs extends any[] = any[], TResult = any> {
  register(
    key: string,
    logicFunction: (...args: TArgs) => TResult,
  ): Map<string, (...args: TArgs) => TResult>;

  execute(key: string, ...args: TArgs): TResult;

  unregister(key: string): boolean;

  getLogicMap(): Map<string, (...args: TArgs) => TResult>;
}
