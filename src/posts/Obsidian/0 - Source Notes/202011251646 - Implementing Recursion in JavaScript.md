# Example of Recursion vs For Loop in JS
Return the sum of the first `n` elements of `arr`.

### Using For Loop
```js
function sum(arr, n) {
	//Returns the sum of the first n elements of arr
	var sum = 0;
	for (var i=0; i<n; i++) {
		sum += arr[i];
	}
	return sum
}
```
### Using Recursion
```js
function sum(arr, n) {
  // Returns the sum of the first n elements of arr
  if (n <= 0) {
    return 0;
  } else {
    return sum(arr, n-1) + arr[n-1];
  }
}
```
---
Source: https://www.freecodecamp.org
Keywords: #javascript #programming 
Related: [[202011251635 - Recursion]], [[202011251539 - For Loops]], [[202011251540 - JavaScript For Loops]]