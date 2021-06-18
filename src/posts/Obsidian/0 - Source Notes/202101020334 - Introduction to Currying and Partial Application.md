# Introduction to Currying and Partial Application

## Currying
- **arity**: arity of a function is the number of arguments it requires
- **currying**: converting a function of `N` arity into ==`N` functions of arity 1==

Currying is restructuring a function so it takes one argument, then returns another function that takes the next argument, and so on.

```js
//Un-curried function
function unCurried(x, y) {
  return x + y;
}

//Curried function
function curried(x) {
  return function(y) {
    return x + y;
  }
}
//Alternative using ES6
const curried = x => y => x + y

curried(1)(2) // Returns 3
```

### How is it useful? 
- useful in your program if you can't supply all the arguments to a function at one time
	- can save each function call into a variable, which will hold the returned function reference that takes the next argument when it's available
#### Usefulness Example
```js
// Call a curried function in parts:
var funcForY = curried(1);
console.log(funcForY(2)); // Prints 3
```

## Partial Application
Applying a few arguments to a function at a time and returning another function that is applied to more arguments

```js
//Impartial function
function impartial(x, y, z) {
  return x + y + z;
}
var partialFn = impartial.bind(this, 1, 2);
partialFn(10); // Returns 13
```

Footer
---
Source:
Keywords: #javascript 
Related: 
- [[JavaScript Functional Programming MOC]]