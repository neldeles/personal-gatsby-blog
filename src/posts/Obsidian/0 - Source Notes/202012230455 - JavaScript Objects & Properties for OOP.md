# Use Closure to Protect Properties Within an Object from Being Modified Externally
- **Closure**: term in JS to define when a function always has access to the context in which it was created
- We use closure to define a variable within the constructor. 
	- This makes the **public property** a **private property**
	- The variable can now only be accessed and changed by methods also within the constructor function
- Sample use cases: Passwords and Bank Accounts i.e. you don't want these easily changeable by any part of your codebase
```js
function Bird() {
  let hatchedEgg = 10; // private variable

  /* publicly available method that a bird object can use */
  this.getHatchedEggCount = function() { 
    return hatchedEgg;
  };
}
let ducky = new Bird();
ducky.getHatchedEggCount(); // returns 10
```
---
Source:
Keywords: #javascript #oop 
Related: [[JavaScript Object Oriented Programming MOC]]