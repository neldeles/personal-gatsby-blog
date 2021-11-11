---
date: '2021-11-07T17:22:42'
tags: typescript,
title:
published: false
description:
aliases:
references:
zet_id: 20211107T172242
date_modified: 2021-11-07T20:49:15
---

What is the logic behind `typeof foo[number]`?

> You'll retrieve all properties on the variable `foo` which can be accessed with a numeric index.

Arrays are essentially objects with number index signatures. So we're telling Typescript: "Hey, fetch types of all the properties with a `number` index signature". And since a Tuple's values can have different types, this fetch returns a union of the different types.

## Example

```ts
const resistors = [
  'black',
  'brown',
  'red',
  'orange', 'yellow', 'green', 'blue','violet','grey','white'
] as const

type Resistor = typeof resistors[number]

const resistorMaps: Record<Resistor, number> = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  grey: 8,
  white: 9,
};

export function decodedValue(value: Resistor[]): number {
  return parseInt(String(resistorMaps[value[0]]) + resistorMaps[value[1]]);
}

```

[index-signature](index-signature.md) applied in this case is.. we don't know what the key value pairs of our object is. We just know that the keys are numbers (because tuple/array)...that's why it's `[number]`.

To further understand the syntax.. `foo[number]` is actually an index accessor. You can read more [here](https://dev.to/dwjohnston/what-s-going-on-with-index-types-in-typescript-1dln). But basically, when in the type space, you can reference the type of an object using square bracket notation.

As for why do they become union?

```ts
interface Person {
  name: string;
  age: number;
  location: string;
}

type P2 = Person["name" | "age"]; // string | number

// since it fetches all properties with index signature of number
type P3 = typeof foo[number]

// can imagine that becomes this
type P3 = typeof foo[0 | 1 | 2 ... | n] // similar to what P2 evaluates to
```

# Footer

---

## Related

---

## References

- https://stackoverflow.com/questions/56897267/what-does-typeof-tuple-with-index-type-signature-represents
- https://gist.github.com/RobinMalfait/490a0560a7cfde985d435ad93f8094c5