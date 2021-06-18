# Write Concise Declarative Functions with ES6 
```js
// ###########################
// ES5
// ###########################
const person = {
  name: "Taylor",
  sayHello: function() {
    return `Hello! My name is ${this.name}.`;
  }
};

// ###########################
// ES6
// ###########################
const person = {
  name: "Taylor",
  sayHello() {
    return `Hello! My name is ${this.name}.`;
  }
};
```
- relevant when defining functions within objects
- in ES5 had to use `function` keyword
	-  in ES6 you can omit the `function` keyword and colon altogether


---
Source:
Keywords: #javascript #es6 
Related: [[202012041610 - Write Concise Object Literal Declarations Using Object Property Shorthand]]
, [[202011202205 - Functions]]
, [[202011221802 - JavaScript Objects]]