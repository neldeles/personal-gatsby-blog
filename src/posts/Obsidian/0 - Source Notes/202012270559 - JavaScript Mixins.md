# JavaScript Mixins 
- mixin allows other objects to use a collection of functions
- used because Inheritance does not work well for unrelated objects i.e. bird and plane
	- they can both fly but one is not the other
```js
// takes obj and gives it the fly method
let flyMixin = function(obj) {
  obj.fly = function() {
    console.log("Flying, wooosh!");
  }
};

let bird = {
  name: "Donald",
  numLegs: 2
};

let plane = {
  model: "777",
  numPassengers: 524
};

flyMixin(bird);
flyMixin(plane);

bird.fly(); // prints "Flying, wooosh!"
plane.fly(); // prints "Flying, wooosh!"
```

---
Source:
Keywords: #javascript #oop 
Related: 
- [[JavaScript Object Oriented Programming MOC]]
- [[202012230623 - JavaScript Inheritance]]