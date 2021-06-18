# Comparing Two Diff Arrays
**Problem:** Compare two arrays and return a new array with any items only found in one of the two given arrays, but not both. In other words, ==return the symmetric difference of the two arrays.==

## Takeaways
- when comparing two arrays, make things easier by merging the arrays into one
	- you can then compare this merged against the original arrays (whether you're looking for intersection, symmetric difference etc.)
## Actual Solution
```js
function diffArray(arr1, arr2) {
	var newArr = arr1.concat(arr2);

	return newArr.filter(item => !(arr1.includes(item) && arr2.includes(item)));
}
```

Footer
---
Source:
Keywords:
Related:
- [[JavaScript Intermediate Algorithm Scripting]]