# Complete a Promise with Resolve and Reject

- 3 states: `pending`, `fulfilled`, `rejected`
	- use `fulfilled` or `rejected` methods to reach terminal state of promise
```js
const myPromise = new Promise((resolve, reject) => {
  if(condition here) {
    resolve("Promise was fulfilled");
  } else {
    reject("Promise was rejected");
  }
});
```

---
Source:
Keywords: #javascript #es6 
Related: [[202012101730 - Create a JavaScript Promise]]