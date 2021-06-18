# Understand the Prototype Chain
- a `subtype` can use use the methods of its `supertype`
	- Object is a `supertype` for all objects in JavaScript
```js
let duck = new Bird("Donald");
duck.hasOwnProperty("name"); //.hasOwnProperty is Object's aka supertype's method
```
- The `hasOwnProperty` method is defined in `Object.prototype`, which can be accessed by `Bird.prototype`, which can then be accessed by `duck`. 
	- This is an example of the prototype chain
```js
Object.prototype.isPrototypeOf(Bird.prototype); // returns true
```
---
Source:
Keywords: #javascript #oop 
Related: [[202012230530 - Use Prototype Properties to Reduce Duplicate Code]]