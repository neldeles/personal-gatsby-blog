# Seek and Destroy
**Problem:** Remove all elements from the initial array that are of the same value as the arguments.

## My Solution
```js
function destroyer(arr) {
	var args = Array.prototype.slice.call(arguments);
	var toDestroy = args.splice(1)
	// returns a new array containing only the elements for which that function returns true
	// if not in toDestroy, return it
	var output = args[0].filter(num => !toDestroy.includes(num));
	return output;
}

destroyer([1, 2, 3, 1, 2, 3], 2, 3); // returns [1, 1]
```

Footer
---
Source:
Keywords: #javascript 
Related: 
- [[JavaScript Intermediate Algorithm Scripting]]
- [[202012291730 - Use the filter Method to Extract Data from an Array]]