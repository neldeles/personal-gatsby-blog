# Use the `every` Method to Check that Every Element in an Array Meets a Criteria 
- works with arrays to check if every element passes a particular test
	- returns `Boolean` value
```js
var numbers = [1, 5, 8, 0, 10, 11];
numbers.every(function(currentValue) {
  return currentValue < 10;
});
// Returns false
```
---
Source:
Keywords: #javascript 
Related: 
- [[JavaScript Functional Programming MOC]]
- [[202101020324 - JavaScript `some` Method]]