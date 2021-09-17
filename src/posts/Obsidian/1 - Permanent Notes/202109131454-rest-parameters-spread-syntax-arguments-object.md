---
date: '2021-09-13T14:54:56'
tags: ['javascript']
title: 
published: true
description:
aliases:
references: ['https://javascript.info/rest-parameters-spread']
---

# rest parameter, spread syntax, and arguments object

For beginners there is often confusion on the difference between the rest parameter and spread syntax because they both use `...`. While the syntax may be the same, they pretty much do opposite things.

The **rest parameter** is used to collapse arguments and allows us to act on the possibly infinite number of arguments passed to a function:
```js
// without rest parameter
function sum(a, b) {
  return a + b;
}

sum(1, 2, 3, 4, 5) // returns 3, 3,4,5 do nothing.

// with rest parameter
function showName(firstName, lastName, ...titles) {
  alert( firstName + ' ' + lastName ); // Julius Caesar

  // the rest go into titles array
  // i.e. titles = ["Consul", "Imperator"]
  alert( titles[0] ); // Consul
  alert( titles[1] ); // Imperator
  alert( titles.length ); // 2
}

showName("Julius", "Caesar", "Consul", "Imperator");
```
Without the **rest parameter [^1]*, the "excessive" arguments will do nothing.

The **spread syntax** expands an iterable object:
```js
let str = "Hello";

alert( [...str] ); // H,e,l,l,o
```

## arguments object
Before the **rest parameter** was introduced, the best way to act on the possibly infinite number of arguments passed to a function was via a special array-like object named `arguments`. This contains all the arguments by their index:
```js
function showName() {
  alert( arguments.length );
  alert( arguments[0] );
  alert( arguments[1] );

  // it's iterable
  // for(let arg of arguments) alert(arg);
}

// shows: 2, Julius, Caesar
showName("Julius", "Caesar");

// shows: 1, Ilya, undefined (no second argument)
showName("Ilya");
```

> In old times, rest parameters did not exist in the language, and using `arguments` was the only way to get all arguments of the function. And it still works, we can find it in the old code.
> 
> But the downside is that although `arguments` is both array-like and iterable, it’s not an array. It does not support array methods, so we can’t call `arguments.map(...)` for example.
>
> Also, it always contains all arguments. We can’t capture them partially, like we did with rest parameters.

[^1]: refer to [arguments object](202109131454-rest-parameters-spread-syntax-arguments-object.md#arguments%20object)

---
Related: 