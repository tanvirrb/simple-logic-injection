export type LogicFunction<TArgs extends any[] = any[], TResult = any> = (
  ...args: TArgs
) => TResult;
export type LogicMap<TArgs extends any[], TResult> = Map<
  string,
  LogicFunction<TArgs, TResult>
>;
