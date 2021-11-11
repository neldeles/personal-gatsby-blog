---
date: '2021-09-20T13:28:24'
tags: ['javascript']
title: Object Destructuring vs Spread Operator vs Rest Parameter
published: true
description:
aliases:
references: ['https://zellwk.com/blog/es6/#destructuring', 'https://dev.to/sarah_chima/destructuring-assignment---arrays-16f', 'https://dev.to/sarah_chima/object-destructuring-in-es6-3fm']
date_modified: 2021-09-21T17:57:05
---

# Object Destructuring vs Spread Operator vs Rest Parameter

### Object Destructuring

You can destructure arrays or objects:
```js
// destructuring arrays
var introduction = ["Hello", "I" , "am", "Sarah"];
var [greeting, pronoun] = introduction;

console.log(greeting);//"Hello"
console.log(pronoun);//"I"

// destructuring objects
var person = {name: "Sarah", country: "Nigeria", job: "Developer"};

var {name, country, job} = person;

console.log(name);//"Sarah"
console.log(country);//"Nigeria"
console.log(job);//Developer"
```
It allows you to conveniently get values out of your arrays and objects.

Here is what a complex destructuring example looks like:
```js
function sayMyName ({
  firstName = 'Zell',
  lastName = 'Liew'
} = {}) {
 console.log(firstName + ' ' + lastName)
}
```

**First**, we can see that this function takes in _one argument_, an object. This object is _optional_ and _defaults to_ `{}` when undefined.

**Second**, we attempt to destructure `firstName` and `lastName` variables from the given object. If these properties are found, use them.

**Finally**, if `firstName` or `lastName` is undefined in the given object, we set it to `Zell` and `Liew` respectively.

### When to use one over the other

- **Rest**: packing/collapsing values into an array
  - appears in:
		- destructuring:
			```js
			let [first, second, third, ...others] = scores
			```
		- function parameters:
			```js
			function ({first, second, ...others}) {
				// do something
			}
			```

- **Spread**: takes an array and spreads it (like jam) into a comma separated list of arguments
  - usually used to concatenate multiple arrays:
		```js
		let array1 = ['one', 'two']
		let array2 = ['three', 'four']
		let array3 = ['five', 'six']

		let combinedArray = [...array1, ...array2, ...array3]

		console.log(combinedArray) // ['one', 'two', 'three', 'four', 'five', 'six']
		```
  - or return `state` in Redux in React

# Footer

---
Related:
- [202011300442 - JavaScript Rest Parameter](202011300442%20-%20JavaScript%20Rest%20Parameter.md)
- [202011300451 - JavaScript Spread Operator](202011300451%20-%20JavaScript%20Spread%20Operator.md)
- [202109211220-useReducer()](202109211220-useReducer().md)