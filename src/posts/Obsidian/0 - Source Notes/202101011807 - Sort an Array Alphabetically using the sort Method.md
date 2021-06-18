# Sort an Array Alphabetically using the sort Method
- `sort` sorts the elements of an array according to the callback function
	- **need to use the callback function** because default sorting method is by string Unicode point value, which may return unexpected results
	- callback function is called `compareFunction`
		- array elements are **sorted according to the return value** of the `compareFunction`
			- if `compareFunction(a,b)`:
				- returns a value less than 0 => a comes before b
				- returns > 0 => b comes before a
				- returns === 0 => a and b remain unchanged
			- for possible `compareFunctions` refer to [source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
### Example Application of Sort Method
```js
function ascendingOrder(arr) {
  return arr.sort(function(a, b) {
    return a - b;
  });
}
ascendingOrder([1, 5, 2, 3, 4]);
// Returns [1, 2, 3, 4, 5]

function reverseAlpha(arr) {
  return arr.sort(function(a, b) {
    return a === b ? 0 : a < b ? 1 : -1;
  });
}
reverseAlpha(['l', 'h', 'z', 'b', 's']);
// Returns ['z', 's', 'l', 'h', 'b']

function alphabeticalOrder(arr) {
  // Only change code below this line
  return arr.sort(function(a,b) {
    return a === b ? 0 : a < b ? -1 : 1;
  });
  // Only change code above this line
}
alphabeticalOrder(["a", "d", "c", "a", "z", "g"]);
```
## Modifying Sort for Functional Programming
- use `concat` to create and return a new array (because `sort` by modifies the original array)
```js
var globalArray = [5, 6, 3, 2, 9];
function nonMutatingSort(arr) {
  return [].concat(arr).sort(function(a,b) {
    return a - b;
  });
}
nonMutatingSort(globalArray);
```
---
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
Keywords: #javascript 
Related: 
- [[202011202144 - Manipulating Arrays]]
- [[JavaScript Functional Programming MOC]]