---
date: '2021-11-10T13:57:36'
tags: kent-dodds, typescript,
title: Constrained identity function
published: false
description:
aliases:
references:
zet_id: 20211110T135736
date_modified: 2021-11-10T15:47:18
---

# Constrained identity function

Combination of two concepts:
1. identity function
2. constrained

Identity function is a function that accepts a value and returns that value:

```tsx
const identity = <Type extends unknown>(item: Type) => item
```

Constrained is when a function acepts a narrower version of an input than it is passed:

```tsx
type NamedObject = {name: string}
function getUserName<User extends NamedObject>(user: User) {
  return user.name
}

const obj = {name: 'Hannah', age: 3}
getUserName(obj)
```

`User` is a type parameter. So it takes the `typeof` `obj` which is `{name: string, age: number}`. This is wider than `NamedObject` which is `{name: string}`. The contract we've defined is the argument needs to be **at least** of type `{name: string}`.

Combining the 2 you get a CIF:

```tsx
type OperationFn = (left: number, right: number) => number
const createOperations = <OperationsType extends Record<string, OperationFn>>(
  opts: OperationsType,
) => opts

const operations = createOperations({
  '+': (left, right) => left + right,
  '-': (left, right) => left - right,
  '*': (left, right) => left * right,
  '/': (left, right) => left / right,
})

type CalculatorProps = {
  left: number
  operator: keyof typeof operations
  right: number
}
function Calculator({left, operator, right}: CalculatorProps) {
  const result = operations[operator](left, right)
  return (
    <div>
      <code>
        {left} {operator} {right} = <output>{result}</output>
      </code>
    </div>
  )
}

const examples = (
  <>
    <Calculator left={1} operator="+" right={2} />
    <Calculator left={1} operator="-" right={2} />
    <Calculator left={1} operator="*" right={2} />
    <Calculator left={1} operator="/" right={2} />
  </>
)
```

For the example above, why do we resort to a CIF? Why not just do the ff:

```tsx
const operations = {
  '+': (left: number, right: number): number => left + right,
  '-': (left: number, right: number): number => left - right,
  '*': (left: number, right: number): number => left * right,
  '/': (left: number, right: number): number => left / right,
}

type CalculatorProps = {
  left: number
  operator: keyof typeof operations
  right: number
}
```

Well those functions are all the same, so we can keep our code DRY by annotating them with a type alias:

```tsx
type OperationFn = (left: number, right: number) => number
const operations: Record<string, OperationFn> = {
  '+': (left, right) => left + right,
  '-': (left, right) => left - right,
  '*': (left, right) => left * right,
  '/': (left, right) => left / right,
}
```

However, the object keys then become strings, and we lose the benefits of Intellisense. To fix this, we can declare the keys as *value types*:

```tsx
type OperationFn = (left: number, right: number) => number
type Operator = '+' | '-' | '/' | '*'
const operations: Record<Operator, OperationFn> = {
  '+': (left, right) => left + right,
  '-': (left, right) => left - right,
  '*': (left, right) => left * right,
  '/': (left, right) => left / right,
}
```

BUT, we now have to declare any new *value types* for  "Operators" in 2 places (`operations` and `Operator`). This problem exists because:

> there's no way to tell TypeScript: "This thing has the keys it has, but the values are this specific type." IMO, this is a missing feature of TypeScript.

# Footer

---

## Related

---

## References

- [How to write a Constrained Identity Function (CIF) in TypeScript](https://kentcdodds.com/blog/how-to-write-a-constrained-identity-function-in-typescript)