# Arguments Optional
**Problem:** Create a function that sums two arguments together. If only one argument is provided, then return a function that expects one argument and returns the sum.

For example, `addTogether(2, 3)` should return 5, and `addTogether(2)` should return a function.

Calling this returned function with a single argument will then return the sum:

`var sumTwoAnd = addTogether(2);`

`sumTwoAnd(3)` returns 5.

If either argument isn't a valid number, return `undefined`.

## My Solution
```js
function addTogether(a,b) {
  if (typeof a === 'number') {
    if(b == undefined) {
      return function(c) {
        if (typeof c === 'number') {
          return a + c;
        } else {
          return undefined;
        }
      }
    } else if (typeof b !== 'number') {
      return undefined;
    } else {
      console.log('sum');
      return a + b;  
    }
  } else {
    console.log('a undefined');
    return undefined;
  }
}
addTogether(2)([3]);
```

## Solution
```js
function addTogether(first, second) {
  if (typeof first !== "number") {
    return undefined;
  }
  const sum = second =>
    typeof second === "number" ? first + second : undefined;
  return typeof second === "undefined" ? second => sum(second) : sum(second);
}
// test here
addTogether(2, 3);
```
**Code Explanation**
-   Return `undefined` if first argument is not a `number` or second argument is defined, but not a `number`.
-   Return sum of the arguments if both are provided otherwise return a sum function.

Footer
---
Source:
Keywords: #javascript 
Related:
- [[JavaScript Intermediate Algorithm Scripting]]