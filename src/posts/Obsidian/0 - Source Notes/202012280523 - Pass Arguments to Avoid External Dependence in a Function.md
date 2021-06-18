# Pass Arguments to Avoid External Dependence in a Function
- always declare your dependencies explicitly
	- if a function depends on a variable or object being present, then pass that variable or object directly into the function as an argument
```js
// the global variable
var fixedValue = 4;

function incrementer(value) {
  return value + 1;
}

var differentValue = incrementer(fixedValue); // Should equal 5
console.log(fixedValue); // Should print 4
```

---
Source:
Keywords: #javascript 
Related: [[JavaScript Functional Programming MOC]]