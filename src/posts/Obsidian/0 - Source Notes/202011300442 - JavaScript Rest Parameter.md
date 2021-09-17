# Use the Rest Parameter with Function Parameters
- used to create functions that take a variable number of arguments
	- arguments are stored in an array that can be accessed later from inside the function

```js
function howMany(...args) {
  return "You have passed " + args.length + " arguments.";
}
console.log(howMany(0, 1, 2)); // You have passed 3 arguments.
console.log(howMany("string", null, [1, 2, 3], { })); // You have passed 4 arguments.
```
- rest parameter eliminates the need to check the args array and allows us to apply `map()`, `filter()` and `reduce()` on the parameters array


---
Source:
Keywords: #javascript #es6
Related: 
- [[202011202205 - Functions]]
- [[202011300445 - JavaScript Map Function]]
- [[202012311518 - JavaScript Reduce Method]]
- [202109131454-rest-parameters-spread-syntax-arguments-object](202109131454-rest-parameters-spread-syntax-arguments-object.md)