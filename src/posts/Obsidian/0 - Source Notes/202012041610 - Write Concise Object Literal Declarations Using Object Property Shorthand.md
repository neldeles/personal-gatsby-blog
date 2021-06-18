# Write Concise Object Literal Declarations Using Object Property Shorthand
```js
// from this:
const getMousePosition = (x, y) => ({
  x: x,
  y: y
});

// to this:
const getMousePosition = (x, y) => ({ x, y });
```
- this differs from [[202011300501 - JavaScript Destructuring Assignment|destructuring assignment]] in that destructure is breaking down the object into new variables
	- with this one you are **creating** the object concisely—using shorthand

---
Source:
Keywords: #javascript #es6 #shorthand 
Related: [[202011300501 - JavaScript Destructuring Assignment]], [[202012041620 - Write Concise Declarative Functions with ES6]]