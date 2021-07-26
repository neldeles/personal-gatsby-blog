---
date: '2021-07-19T14:13:38'
tags: ['javascript']
title: 
published: true
description:
aliases:
references:
---

# Javascript Mental Models
## The JavaScript Universe
### Values
![](Pasted%20image%2020210719141426.png)

Values *don't* exist inside your code, they float in space, and you just refer to them.

There are 2 kinds of values:
- primitive: 
  - **like stars**—permanent
  - can't create/destroy/change them
	- hence they are [Immutable](Javascript%20Mental%20Models.md#Primitive%20Values%20are%20Immutable)
	- are pre-made and already exist in the universe, we just "summon" them
- objects and functions: 
  - **like asteroids**
  - can be manipulated

Collectively between the 2 kinds, there are **9 types of values**

Fun fact: `null` is a primitive value, but when you check its type `console.log(typeof(null))` it returns `object`. 

> This is a very old bug in JavaScript. It cannot be fixed because fixing it would break a lot of existing code that, for better or worse, already relies on this quirk.

### Expressions
> **Expressions are questions that JavaScript can answer. JavaScript answers expressions in the only way it knows how—with values.**
- expressions always result in a single value
- numbers like `2` or strings like `'The Kraken` are also expressions
  - such expressions are called *literals* because we literally write down the values they result in

## Values and Variables
### Primitive Values are Immutable
![](Pasted%20image%2020210719145322.png)

#### Variables and Values— a contradiction?
**Variables are not values. Variables point to values. Can think of variables as wires.**
 This is why even though a variable is assigned a primitive, which is immutable, this is possible:
 
```js
let pet = 'Narwhal';
pet = 'The Kraken';
console.log(pet); // "The Kraken"
```

We are just *rewiring* the variable to point to something else. 

After a variable is declared, it always points to a value. And if you don’t specify where it should point, it will point to `undefined`!

Another example. Given the ff: 

```js
let x = 10;
let y = x;
x = 0;
```

> **Note that `y = x` did not mean point `y` to `x`. We can’t point variables to each other! Variables always point to _values_.** When we see an assignment, we “ask” the right side’s value, and point the “wire” on the left side to _that value_.

### No such thing as "passing a variable"
I can also _read_ the value of a variable—for example, to log it:

```js
console.log(pet);
```

That’s hardly surprising.

But note that it is not the `pet` _variable_ that we pass to `console.log`. We might say that colloquially, but we can’t really pass _variables_ to functions. We pass the current _value_ of the `pet` variable.

### Meeting objects and functions
#### Objects
Unlike primitives, which we just "summon", we can *create* objects.
![](Pasted%20image%2020210719173723.png)

**Every time we use the `{}` object literal, we _create_ a brand new object value:**

```js
let shrek = {};
let donkey = {};
```

![](Pasted%20image%2020210719173819.png)

#### Functions
```js
for (let i = 0; i < 7; i++) {
  console.log(function() {});
}
```

How many different values does this code pass to `console.log`? 

The answer is 7. Similar to `objects`, every time **we execute a line of code that contains a function expression, a brand new function value appears in our universe.**

Functions are also values. We can wire them to variables and it is no different than pointing variables to numbers or objects.

```js
let countDwarves = function() { return 7; };
let dwarves = countDwarves;
let dwarves = countDwarves(); // () is a function call
console.log(dwarves);
```

**Adding `()` changes the meaning of our code:**

-   `let dwarves = countDwarves` means “Point `dwarves` to the value that `countDwarves` is currently pointing to.”
-   `let dwarves = countDwarves()` means “Point `dwarves` to the value **returned by** the function that `countDwarves` is currently pointing to.”

In fact, `countDwarves()` is also an expression. It’s known as a _call expression_. To “answer” a call expression, JavaScript runs the code inside our function, and hands us the returned value as the result (in this example, it’s `7`).

## Kinds of Equality
### Same Value Equality
When wired to the same value, they are of same value.

```js
let dwarves = 7;
let continents = '7';
let worldWonders = 3 + 4;
console.log(Object.is(worldWonders, dwarves)) // true — are same value
```

### Strict Equality
So what’s the difference between `Object.is` and `===`?

**Same value equality**—`Object.is(a, b)`—has a direct meaning in our mental model. It corresponds to the idea of “the same value” in our universe.

In almost all cases, the same intuition works for **strict value equality**.

`2===2` is `true` because `2` always "summons" the same value. `{}==={}` is `false` because each `{}` *creates* a different value.

#### Exceptions to the rule
##### NaN
`NaN === NaN` will always be `false`. BUT `Object.is(NaN, NaN))` is `true`.

### Loose Equality
The rules of **loose equality** (also called “abstract equality”) are arcane and confusing. Many coding standards prohibit the use of `==` and `!=` in code altogether.

## Properties
In our JavaScript universe, similar to variables, properties act like **wires**. The difference is properties *start from objects* rather than from our code.

![](Pasted%20image%2020210720143251.png)

Here is a more complex example.

```js
let sherlock = {
  surname: 'Holmes',
  address: { city: 'London' }
};

let john = {
  surname: 'Watson',
  address: sherlock.address
};

john.surname = 'Lennon';
john.address.city = 'Malibu';
```

![](Pasted%20image%2020210720143729.png)

As you can see from the sketch of our mental model, this is why `sherlock.address.city` changed when `john.address.city` was re-assigned. The wires were pointing to the same value!

> A property always points to a value

In the above example,  that value was an `object` containing `city` of `London`.

To fix this, we can refer to the topic of [Mutation](Javascript%20Mental%20Models.md#Mutation).

### Assigning to a property
What happens when we *assign* a value to a property?

```js
sherlock.age = 65
```

We follow the `sherlock` wire, then follow the `age` wire. Then we look. at the value on the right side of `=`— `65`. So we summon `65` then point the `sherlock.age` wire to `65`.

### Missing Properties
**JavaScript uses a set of rules that looks something like this:**

1.  Figure out the value of the part before the dot (`.`).
2.  If that value is `null` or `undefined`, throw an error immediately.
3.  Check whether a property with that name exists on our object:  
    a. If **it exists**, answer with the value this property points to.  
    b. If **it doesn’t exist**, answer with the `undefined` value.

### Mutation
Mutation just means change. In our Sherlock and Watson example, one way to fix the issue is to avoid mutating shared data:

```js
john.surname = 'Lennon';
john.address = { city: 'Malibu' }; // previously john.address.city = 'Malibu'
```

Our new mental model becomes:
![](Pasted%20image%2020210720145418.png)

`john.address` isn't shared, so we mutate that.

Alternate solution is to avoid mutating data altogether.

```js
john = {
  surname: 'Lennon',
  address: { city: 'Malibu' }
};
```

Here, we don’t mutate John’s object at all. Instead, we _reassign_ the `john` variable to point to a “new version” of John’s data. From now on, `john` points to a different object, whose `address` also points to a completely new object:

![](Pasted%20image%2020210720145703.png)

This is what mutation is meant when referring to [const](202011300410%20-%20const%20keyword.md) and how object mutation is still possible.

## Key Terms
- literals
  - object literal
- expression
  - call expression
 
---
Related: 