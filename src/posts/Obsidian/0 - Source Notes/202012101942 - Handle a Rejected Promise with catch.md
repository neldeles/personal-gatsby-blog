# Handle a Rejected Promise with catch
- `catch` is the method to use when your promise has been rejected
- executed after promise's `reject` method is called
```js
myPromise.catch(error => {
  // do something with the error.
});
```
- `error` is the argument passed into the `reject` method

---
Source:
Keywords: #javascript #es6 
Related: 
- [[202012101935 - Handle a Fulfilled Promise with then]]
- [[202012101800 - Complete a Promise with Resolve and Reject]]