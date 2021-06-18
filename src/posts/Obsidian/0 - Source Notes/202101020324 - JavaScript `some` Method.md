# Use the `some` Method to Check that Any Elements in an Array Meet a Criteria
- works with arrays to check if _any_ element passes a particular test
	- returns `Boolean` value
```js
var numbers = [10, 50, 8, 220, 110, 11];
numbers.some(function(currentValue) {
  return currentValue < 10;
});
// Returns true
```

---
Source:
Keywords: #javascript 
Related: 
- [[202101012127 - JavaScript `every` Method]]