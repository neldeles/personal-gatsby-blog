# JavaScript Arrow (Anonymous) Functions
- used especially when passing a function as an argument to another function

 ## Pre-ES6 Anonymous Function
 ```js
const myFunc = function() {
  const myVar = "value";
  return myVar;
}
```
## ES6 Anonymous Function aka Arrow Function
```js
const myFunc = () => {
  const myVar = "value";
  return myVar;
}
```
### If no function body and only a return value
```js
const myFunc = () => "value";
```
- omit the keyword `return` as well as the brackets surrounding the code

## With Parameters
```js
// multiplies the first input value by the second and returns it
const multiplier = (item, multi) => item * multi;
multiplier(4, 2); // returns 8
```
### If Single Parameter
```js
// the same function, without the parameter parentheses
const doubler = item => item * 2;
```
- can omit the parenthesis
---
Source:
Keywords: #javascript #es6 #shorthand
Related: [[202011202205 - Functions]]