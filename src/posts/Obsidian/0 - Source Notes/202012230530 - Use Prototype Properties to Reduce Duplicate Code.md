# Prototype Properties
- properties in the `prototype` are shared among ALL instances of the `object`
	- in this way you avoid duplication of a variable
```js
// instead of:
function Bird(name) {
	this.name = name;
	this.numLegs = 2;
}

// assign it to the prototype:
function Bird(name) {
	this.name = name;
}

Bird.prototype.numLegs = 2;

// all instances of Bird will have the numLegs property
console.log(duck.numLegs);  // prints 2
console.log(canary.numLegs);  // prints 2
```

## Add multiple properties at once
- set the `prototype` to a new object that already contains the properties
- **make sure to define the [[202012230544 - JavaScript Constructor Property|`constructor` property]]**
	- it's a side effect of manually setting the prototype to a new object
```js
Bird.prototype = {
  constructor: Bird, // define the constructor property
  numLegs: 2, 
  eat: function() {
    console.log("nom nom nom");
  },
  describe: function() {
    console.log("My name is " + this.name);
  }
};
```

---
Source:
Keywords: #javascript #oop 
Related: 
- [[202012230455 - JS Objects & Properties for OOP]]
- [[202012230603 - Understand the Prototype Chain]]