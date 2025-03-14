export const LogicInjectionErrorType = {
  NOT_FOUND: 'NOT_FOUND',
  INVALID_KEY: 'INVALID_KEY',
  INVALID_FUNCTION: 'INVALID_FUNCTION',
  DUPLICATE_KEY: 'DUPLICATE_KEY',
} as const;

export type LogicInjectionErrorTypeValue =
  (typeof LogicInjectionErrorType)[keyof typeof LogicInjectionErrorType];

export class LogicInjectionError extends Error {
  constructor(type: LogicInjectionErrorTypeValue, key: string) {
    const messages = {
      [LogicInjectionErrorType.NOT_FOUND]: `Logic with key "${key}" not found`,
      [LogicInjectionErrorType.INVALID_KEY]: `Invalid key: "${key}". Key must be a non-empty string.`,
      [LogicInjectionErrorType.INVALID_FUNCTION]: `Invalid logic function for key "${key}". Function must be callable.`,
      [LogicInjectionErrorType.DUPLICATE_KEY]: `Logic with key "${key}" already exists`,
    };

    super(messages[type]);
    this.name = 'LogicInjectionError';
  }
}
