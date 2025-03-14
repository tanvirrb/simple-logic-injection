import { describe, it } from 'node:test';
import assert from 'node:assert';
import LogicInjector from '@app/index';
import { LogicInjectionError } from '@app/utils/LogicInjectionError';

describe('logicInjection', () => {
  // Registration tests
  it('should register a function successfully', () => {
    const logicInjector = new LogicInjector<[number, number], number>();
    const add = (a: number, b: number): number => a + b;
    logicInjector.register('add', add);
    assert.strictEqual(logicInjector.get('add'), add);
  });

  it('should throw when registering with empty key', () => {
    const logicInjector = new LogicInjector<[number, number], number>();
    const add = (a: number, b: number): number => a + b;
    assert.throws(
      () => logicInjector.register('', add),
      (err: Error) => {
        assert(err instanceof LogicInjectionError);
        assert.strictEqual(
          err.message,
          'Invalid key: "". Key must be a non-empty string.',
        );
        return true;
      },
    );
  });

  it('should throw when registering with whitespace key', () => {
    const logicInjector = new LogicInjector<[number, number], number>();
    const add = (a: number, b: number): number => a + b;
    assert.throws(
      () => logicInjector.register('   ', add),
      LogicInjectionError,
    );
  });

  it('should throw when registering non-function', () => {
    const logicInjector = new LogicInjector<[number, number], number>();
    assert.throws(() => {
      // @ts-expect-error Testing runtime type check
      logicInjector.register('test', 'not a function');
    }, LogicInjectionError);
  });

  // Execution tests
  it('should execute registered function correctly', () => {
    const logicInjector = new LogicInjector<[number, number], number>();
    const add = (a: number, b: number): number => a + b;
    logicInjector.register('add', add);
    assert.strictEqual(logicInjector.execute('add', 2, 3), 5);
  });

  it('should throw when executing non-existent function', () => {
    const logicInjector = new LogicInjector<[number, number], number>();
    assert.throws(
      () => logicInjector.execute('nonexistent', 1, 2),
      (err: Error) => {
        assert(err instanceof LogicInjectionError);
        assert.strictEqual(
          err.message,
          'Logic with key "nonexistent" not found',
        );
        return true;
      },
    );
  });

  // Multiple functions tests
  it('should handle multiple functions', () => {
    const logicInjector = new LogicInjector<[number, number], number>();
    const add = (a: number, b: number): number => a + b;
    const multiply = (a: number, b: number): number => a * b;
    logicInjector.register('add', add);
    logicInjector.register('multiply', multiply);

    assert.strictEqual(logicInjector.execute('add', 2, 3), 5);
    assert.strictEqual(logicInjector.execute('multiply', 2, 3), 6);
  });

  // Unregister tests
  it('should unregister function successfully', () => {
    const logicInjector = new LogicInjector<[number, number], number>();
    const add = (a: number, b: number): number => a + b;
    logicInjector.register('add', add);
    const result = logicInjector.unregister('add');
    assert.strictEqual(result, true);
    assert.throws(() => logicInjector.get('add'), LogicInjectionError);
  });

  it('should return false when unregistering non-existent function', () => {
    const logicInjector = new LogicInjector<[number, number], number>();
    assert.strictEqual(logicInjector.unregister('nonexistent'), false);
  });

  it('should throw when unregistering with invalid key', () => {
    const logicInjector = new LogicInjector<[number, number], number>();
    assert.throws(() => logicInjector.unregister(''), LogicInjectionError);
  });

  // Get tests
  it('should get registered function', () => {
    const logicInjector = new LogicInjector<[number, number], number>();
    const add = (a: number, b: number): number => a + b;
    logicInjector.register('add', add);
    const func = logicInjector.get('add');
    assert.strictEqual(func(2, 3), 5);
  });

  it('should throw when getting non-existent function', () => {
    const logicInjector = new LogicInjector<[number, number], number>();
    assert.throws(() => logicInjector.get('nonexistent'), LogicInjectionError);
  });

  // Logic list tests
  it('should return correct logic list', () => {
    const logicInjector = new LogicInjector<[number, number], number>();
    const add = (a: number, b: number): number => a + b;
    const multiply = (a: number, b: number): number => a * b;
    logicInjector.register('add', add);
    logicInjector.register('multiply', multiply);

    const list = logicInjector.getLogicList();
    assert.strictEqual(list.size, 2);
    assert.strictEqual(list.has('add'), true);
    assert.strictEqual(list.has('multiply'), true);
  });

  // Edge cases
  it('should throw when registering duplicate key', () => {
    const logicInjector = new LogicInjector<[number, number], number>();
    const add = (a: number, b: number): number => a + b;
    const multiply = (a: number, b: number): number => a * b;

    logicInjector.register('math', add);
    assert.throws(
      () => logicInjector.register('math', multiply),
      (err: Error) => {
        assert(err instanceof LogicInjectionError);
        assert.strictEqual(err.message, 'Logic with key "math" already exists');
        return true;
      },
    );
  });

  // Generic type tests
  it('should handle different generic types', () => {
    const logicInjector = new LogicInjector<[string, string], string>();
    const concat = (a: string, b: string): string => a + b;

    logicInjector.register('concat', concat);
    assert.strictEqual(
      logicInjector.execute('concat', 'hello ', 'world'),
      'hello world',
    );
  });

  it('should handle complex types', () => {
    interface User {
      name: string;
      age: number;
    }
    const logicInjector = new LogicInjector<[User], string>();

    const formatUser = (user: User): string =>
      `${user.name} is ${user.age} years old`;
    logicInjector.register('format', formatUser);

    assert.strictEqual(
      logicInjector.execute('format', { name: 'John', age: 30 }),
      'John is 30 years old',
    );
  });

  // Null/undefined handling
  it('should throw when key is undefined', () => {
    const logicInjector = new LogicInjector<[number, number], number>();
    const add = (a: number, b: number): number => a + b;
    assert.throws(() => {
      // @ts-expect-error Testing runtime behavior with undefined
      logicInjector.register(undefined, add);
    }, LogicInjectionError);
  });

  it('should throw when function is null', () => {
    const logicInjector = new LogicInjector<[number, number], number>();
    assert.throws(() => {
      // @ts-expect-error Testing runtime behavior with null
      logicInjector.register('test', null);
    }, LogicInjectionError);
  });
});
