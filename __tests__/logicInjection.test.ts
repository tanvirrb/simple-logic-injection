import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import LogicInjector from '@app/index';
import { faker } from '@faker-js/faker';

describe('logicInjection', () => {
  it('should register add logic', () => {
    const logic = new LogicInjector();
    logic.register('add', (a: number, b: number) => a + b);

    assert.strictEqual(logic.execute('add', 1, 2), 3);
  });

  it('should remove add logic', () => {
    const logic = new LogicInjector();
    logic.register('add', (a: number, b: number) => a + b);
    const isLogicUnregistered = logic.unregister('add');

    assert.ok(isLogicUnregistered);
    assert.throws(() => {
      logic.execute('add', 1, 2);
    }, Error);
  });

  it('should register subtract logic', () => {
    const logic = new LogicInjector();
    logic.register('subtract', (a: number, b: number) => a - b);

    assert.strictEqual(logic.execute('subtract', 1, 2), -1);
  });

  it('should remove subtract logic', () => {
    const logic = new LogicInjector();
    logic.register('subtract', (a: number, b: number) => a - b);
    const isLogicUnregistered = logic.unregister('subtract');

    assert.ok(isLogicUnregistered);
    assert.throws(() => {
      logic.execute('subtract', 1, 2);
    }, Error);
  });

  it('should get the logic list', () => {
    const logic = new LogicInjector();
    logic.register('add', (a: number, b: number) => a + b);
    logic.register('subtract', (a: number, b: number) => a - b);

    const logicList = logic.getLogicList();
    assert.strictEqual(logicList.size, 2);
  });

  it('should concatenate strings', () => {
    const logic = new LogicInjector();
    logic.register('concatenate', (a: string, b: string) => a + b);

    assert.strictEqual(
      logic.execute('concatenate', 'hello', 'world'),
      'hello'.concat('world'),
    );
  });

  it('should concatenate strings and return the length', () => {
    const logic = new LogicInjector();
    logic.register('concatenate', (a: string, b: string) => (a + b).length);

    assert.strictEqual(logic.execute('concatenate', 'hello', 'world'), 10);
  });

  // create two custom interfaces named userData and updatedUser and create a LogicInjector with those two types as passed generics.
  // then register a logic and execute it
  it('should register and execute a logic function with custom interfaces', () => {
    interface UserData {
      name: string;
      age: number;
    }

    interface UpdatedUser {
      name: string;
      age: number;
      email: string;
    }

    const person = {
      name: faker.person.firstName(),
      age: faker.number.int({ min: 18, max: 100 }),
      email: faker.internet.email(),
    };

    const logic = new LogicInjector();

    logic.register(
      'updateUser',
      (user: UserData, email: string): UpdatedUser => ({
        ...user,
        email,
      }),
    );

    const updatedUser = logic.execute(
      'updateUser',
      { name: person.name, age: person.age },
      person.email,
    );
    assert.deepEqual(updatedUser, {
      name: person.name,
      age: person.age,
      email: person.email,
    });
  });

  it('should get a logic with key', () => {
    const logic = new LogicInjector();
    logic.register('add', (a: number, b: number) => a + b);

    const addLogic = logic.get('add');
    assert.strictEqual(addLogic(1, 2), 3);
  });

  it('should throw an error when logic is not found', () => {
    const logic = new LogicInjector();
    assert.throws(() => {
      logic.get('add');
    }, Error);
  });
});
