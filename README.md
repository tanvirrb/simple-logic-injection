# Simple Logic Injection

A lightweight TypeScript library for injecting and executing logic dynamically.

## Features

- Register and execute logic functions dynamically
- Unregister logic functions when no longer needed
- Type-safe with full TypeScript support

## Installation
Publishing to `npm` is still work in progress. For now, you can install the package directly from GitHub.
```sh
npm install https://github.com/tanvirrb/simple-logic-injection
```

## Usage

### Importing and Instantiating

```ts
import LogicInjector from 'simple-logic-injection';

const logicInjector = new LogicInjector<string[], string>();
```
or you can use without any explicit type
```ts
import LogicInjector from 'simple-logic-injection';

const logicInjector = new LogicInjector();
```

### Registering Logic

```ts
logicInjector.register('greet', (name: string) => `Hello, ${name}!`);
```

### Executing Logic

```ts
const message = logicInjector.execute('greet', 'Alice');
console.log(message); // Output: Hello, Alice!
```

### Unregistering Logic

```ts
logicInjector.unregister('greet');
```

### Get logic by key

```ts
const logic = logicInjector.get('greet');
```

### Getting the Logic List

```ts
const logicList = logicInjector.getLogicList();
console.log(logicList); // Output: { greet: [Function] }
```

## Scripts

- `build` - Compiles TypeScript
- `start` - Runs the compiled JavaScript file
- `test` - Runs unit tests
- `lint` - Lints the project
- `lint:fix` - Fixes lint issues
- `format` - Formats code with Prettier

## License

Apache-2.0
```

