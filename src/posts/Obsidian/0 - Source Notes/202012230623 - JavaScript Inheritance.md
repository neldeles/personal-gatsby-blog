# JavaScript Inheritance 
There are 2 (or 3) steps:
1. Inherit Behaviors from a Supertype
```js
// Object.create(obj)
// Making a new instance of Animal
let animal = Object.create(Animal.prototype);
```
- creates a new object and sets `obj` as the new object's `prototype`
2. Set the Child's Prototype to an Instance of the Parent
```js
// Bird's prototype is now an instance of Animal
Bird.prototype = Object.create(Animal.prototype);

// Bird now inherits from Animal
let duck = new Bird("Donald");
duck.eat(); // prints "nom nom nom"
```
- `duck` inherits Animal's properties; including the `.eat` method
3. Reset Inherited Constructor Property
- when an object inherits its `prototype` from another object, it also inherits the supertype's constructor property
- `duck` and all instances of `Bird` should show that they were constructed by `Bird` and not `Animal`
	- **so you reset it**
```js
function Bird() { }
Bird.prototype = Object.create(Animal.prototype);
let duck = new Bird();
duck.constructor // function Animal(){...}
// reset constructor
Bird.prototype.constructor = Bird;
duck.constructor // function Bird(){...}
```
## Adding Methods after Inheritance
In addition to what is inherited from Animal, you want to add behavior that is unique to `Bird` objects. Here, `Bird` will get a `fly()` function. Functions are added to Bird's prototype the same way as any constructor function:
```js
Bird.prototype.fly = function() {
  console.log("I'm flying!");
};
```
Can possibly add multiple methods at once by following `prototype` construction: [[202012230530 - Use Prototype Properties to Reduce Duplicate Code#Add multiple properties at once]]

---
Source:
Keywords: #javascript #oop 
Related: 
- [[JavaScript Object Oriented Programming MOC]]