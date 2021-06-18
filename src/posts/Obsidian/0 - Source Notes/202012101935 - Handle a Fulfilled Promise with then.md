# Handle a Fulfilled Promise with then
- `then` method is executed immediately after your promise is fulfilled with `resolve`
```js
myPromise.then(result => {
  // do something with the result.
});
```
- `result` is the argument passed to the `resolve` method
```js
const makeServerRequest = new Promise((resolve, reject) => {
  // responseFromServer is set to true to represent a successful response from a server
  let responseFromServer = true;
    
  if(responseFromServer) {
    resolve("We got the data");
  } else {  
    reject("Data not received");
  }
});
 
makeServerRequest.then(result => {
  console.log(result);
});

```

---
Source:
Keywords: #javascript #es6 
Related: [[202012101800 - Complete a Promise with Resolve and Reject]]
, [[202012101942 - Handle a Rejected Promise with catch]]