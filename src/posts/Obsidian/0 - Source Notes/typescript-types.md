---
date: '2021-11-02T17:39:29'
tags: typescript
title:
published: false
description:
aliases:
references: ['https://www.youtube.com/watch?v=BwuLxPH8IDs', 'Typescript in 50 lessons']
zet_id: 20211102T173929
date_modified: 2021-11-04T20:38:40
---

# Typescript types

## Structural typing

> All we should care about is that all properties that we need are available. This is the contract for our objects and functions.

This means that if there are surplus properties in an assignment of an object, Typescript is forgiving and will allow it, as long as the properties **needed** are there.

## Core Types

| type    | description      | notes                                                                      |
| ------- | ---------------- | -------------------------------------------------------------------------- |
| number  | 1, 5.3, -10      | no differentiatin between integers or floats                               |
| string  | 'Hi', "Hi", `Hi` | All text values                                                            |
| boolean | true, false      | Just these two, no "truthy" or "falsy" values                              |
| object  | {ages:30}        | Any JS object, more specific types (type of object) are possible           |
| Array   | [1,2,3]          | Any js array, type can be flexible or strict (regarding the element types) |
| Tuple   | [1,2]            | Added by TS: fixed-length **and** fixed-type                               |
| Enum    | enum {NEW, OLD}  | Added by TS: automatically enumerated global constant identifiers          |
| Any     |                  | avoid whenever possible; equivalent to vanilla JS                          |

### Examples

#### number, string, and boolean

```ts
function add(n1: number, n2: number, printResult: boolean) {
  if (printResult) {
    console.log(n1 + n2);
  }
  return n1 + n2;
}

const number1 = 8;
const number2 = 2.8;
const showResult = true;

const result = add(number1, number2, showResult);
```

#### object and array

```ts
// We are taking advantage of Typescript's Type Inference feature
const person = {
	name: 'Noel',
	age: 29,
	// TS infer's this also based on the assigned values
	hobbies: ['Sports', 'Cooking']
}
```

#### tuples

Note that JavaScript doesn't have tuples support. It's something that Typescript adds.

For tuple you'll need to explicitly set the types:

```ts
const person: {
	name: string;
	age: number;
	hobbies: string[];
	role: [number, string];
} = {
	name: 'Noel',
	age: 29,
	hobbies: ['sports', 'cooking'],
	role: [2, 'author']
}
```

#### Enum

Like tuples, JS doesn't have support for this and is something added by Typescript. "global constants" you want represented as numbers but to which you want to assign human-readable labels. An application of this is [variants-in-tailwind-and-typescript](variants-in-tailwind-and-typescript.md)

```ts
// without TS we'd have constants like this
// const ADMIN = 0
// const READ_ONLY = 1
// const AUTHOR = 2

// default increments by 1 from 0
// if you want to change the starting number, ADMIN = 5
enum Role { ADMIN, READ_ONLY, AUTHOR }

// you can also assign it to anything you want
enum Role { ADMIN = 'ADMIN', READ_ONLY = 100, AUTHOR = 'AUTHOR' }

const person = {
	name: 'Noel',
	age: 29,
	hobbies: ['sports', 'cooking'],
	role: Role.ADMIN
}
```

## Additional types

### Union Types

Allows you to combine types. It's a way to extract the lowest common denominator of a set of types

You may come across errors such as this:
![](CleanShot-2021-11-02-at-19.11.09@2x.png)

This is because Typescript just sees that you're accepting multiple types, but doesn't check anymore if those types are compatible with each other i.e. strings and numbers can both use the `+` operator.

To handle this, you need to set runtime checks:

```ts
function combine(input1: number | string, input2: number | string) {
  let result;
  if (typeof input1 === "number" && typeof input2 === "number") {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

const combinedAges = combine(30, 26);
console.log(combinedAges);

const combinedNames = combine("Max", "Anna");
console.log(combinedNames);
```

TLDR: If using Union types, make sure to use type guards (if statements) to narrow down the union type to its single type.

### Literal Types

A Literal of one of your Core Types.

```ts
function combine(
	input1: number | string,
	input2: number | string,
	// a union typed Literal type
	resultConversion: 'as-number' | 'as-text') {
  let result;
  if (typeof input1 === "number" && typeof input2 === "number" || resultConversion === 'as-number') {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

const combinedAges = combine(30, 26, 'as-number');
console.log(combinedAges);

const combinedStringAges = combine('30', '26', 'as-number')

const combinedNames = combine("Max", "Anna", 'as-text');
console.log(combinedNames);
```

### Function Return Types and Void

Should let Typescript infer the return type majority of the time. If you need to set it explicitly, syntax is:

```ts
function add(n1: number, n2: number): number {
  return n1 + n2
}
```

#### Void return type

Not in JS. It is something Typescript adds. Can use it to explicitly declare that the function **does not have a return statement.**

```ts
// this implicitY returns Void i.e.
// function printResult(num: number): void
function printResult(num: number) {
  console.log('Result: ' + num);
}

printResult(add(5, 12))
```

### Function Types

Allows us to describe which type of function we want to use somewhere.

```ts
// we only to assign to combineValues variable a function that accepts 2 numbers and returns a number
let combineValues: (a: number, b: number) => number;
```

#### Function types and callbacks

```ts
// expect cb to be a function that accepts a number and returns void
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(10, 20, (result) => {
  console.log(result);
});
```

### Unknown type

If you **really** need to use `any` type, better to use Unknown.[^1]

> Anything is assignable to _unknown_, but _unknown_ isn’t assignable to anything but itself and _any_ without a type assertion or a control flow based narrowing. Likewise, no operations are permitted on an _unknown_ without first asserting or narrowing to a more specific type.

```ts
let userInput: unknown;
let userName: string;
userInput = 5;
userInput= 'Max';
if (typeof userInput === 'string') {
	userName = userInput;
}
```

### Never type

Usually used for functions that throw errors. The function *"never"* returns anything because the script stops executing.

```ts
function generateError (message: string, code: number): never {
	throw { message: message, errorCode: code };
}

generateError('An error occurred', 500)
```

## Type Aliases

Create an alias for your types:

```ts
// creating our Alias
type Combinable = number | string;
type ConversionDescriptor = "as-number" | "as-text";

function combine(
  input1: Combinable,
  input2: Combinable,
  resultConversion: ConversionDescriptor
) {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

const combinedAges = combine(30, 26, "as-number");
console.log(combinedAges);

const combinedStringAges = combine("30", "26", "as-number");

const combinedNames = combine("Max", "Anna", "as-text");
console.log(combinedNames);
```

### Creating an array of objects

```tsx
interface Todo {
	text: string;
	complete: boolean;
}

type State = Todo[];

const TodoReducer = (state: State, action: Actions) => {
	// some code here
}
```

## Left-hand typing vs Right-hand typing

- left-hand typing: typing happens **before** the `=` sign
- right-hand typing: typing happens **after** the `=` sign
	- infers the type

```tsx
let deliveryAddresses = [
	'421 Smashing Hill, 90210',
	'221b Paw-ker Street',
	'4347 Whiskers-ia Lane',
] // Type of deliveryAddresses is string[]; right hand typing

// left-hand typing
let deliveryAddresses: string[] = []
```

# Footer

---

## Related

---

## References

- https://www.youtube.com/watch?v=BwuLxPH8IDs

[^1]: https://fullstackopen.com/en/part9/first_steps_with_type_script#:~:text=Anything%20is%20assignable%20to%20unknown%2C%20but%20unknown%20isn%E2%80%99t%20assignable%20to%20anything%20but%20itself%20and%20any%20without%20a%20type%20assertion%20or%20a%20control%20flow%20based%20narrowing.%20Likewise%2C%20no%20operations%20are%20permitted%20on%20an%20unknown%20without%20first%20asserting%20or%20narrowing%20to%20a%20more%20specific%20type.