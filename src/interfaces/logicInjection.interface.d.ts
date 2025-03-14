import { LogicFunction, LogicMap } from '../types/logic';

export interface ILogicInjection<TArgs extends any[] = any[], TResult = any> {
  register(
    key: string,
    logicFunction: LogicFunction<TArgs, TResult>,
  ): LogicMap<TArgs, TResult>;

  execute(key: string, ...args: TArgs): TResult;

  unregister(key: string): boolean;

  get(key: string): LogicFunction<TArgs, TResult>;

  getLogicList(): LogicMap<TArgs, TResult>;
}
