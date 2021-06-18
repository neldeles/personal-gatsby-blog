# Create a JavaScript Promise
- used to make a promise, usually asynchronously
- `Promise` is a constructor function
	- so need to use `new` keyword
	- takes a function as its argument, with 2 parameters: `resolve` and `reject`
		- methods used to determine the outcome of the promise
```js
const myPromise = new Promise((resolve, reject) => {

});
```


---
Source:
Keywords: #javascript #es6 
Related: [[202012101800 - Complete a Promise with Resolve and Reject]]