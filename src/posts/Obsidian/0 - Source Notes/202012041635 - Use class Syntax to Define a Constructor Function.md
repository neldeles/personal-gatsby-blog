# Use class Syntax to Define a Constructor Function
- ES6 provides new syntax to create [[202011221802 - JavaScript Objects|objects]], using the `class` keyword

In ES5, we usually define a constructor function and use the new keyword to instantiate an object.

```js
var SpaceShuttle = function(targetPlanet){
  this.targetPlanet = targetPlanet;
}
var zeus = new SpaceShuttle('Jupiter');
```
The `class` syntax simply replaces the constructor function creation:
```js
class SpaceShuttle {
  constructor(targetPlanet) {
    this.targetPlanet = targetPlanet;
  }
}
const zeus = new SpaceShuttle('Jupiter');
```
It should be noted that the class keyword declares a new function, to which a constructor is added. This constructor is invoked when new is called to create a new object.

**Notes:**
- UpperCamelCase should be used by convention for ES6 class names, as in SpaceShuttle used above.
- The constructor method is a special method for creating and initializing an object created with a class
## Example Use Case
Create a `Vegetable` class that allows you to create a vegetable object with a property name that gets passed to the constructor.

```js
class Vegetable {
    constructor(targetVegetable) {
        this.name = targetVegetable
    }
}

const carrot = new Vegetable('carrot');
console.log(carrot.name); // Should display 'carrot'
```

---
Source:
Keywords: #javascript #es6 
Related: