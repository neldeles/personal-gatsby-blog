# JavaScript Constructor Property
- is a reference to the constructor function that created the instance
```js
let duck = new Bird();
let beagle = new Dog();

console.log(duck.constructor === Bird);  //prints true
console.log(beagle.constructor === Dog);  //prints true
```
- better to use [[202012230522 - instanceof|instanceof]] because the `constructor` property can be overwritten
---
Source:
Keywords: #javascript #oop 
Related: [[202012230455 - JS Objects & Properties for OOP]]