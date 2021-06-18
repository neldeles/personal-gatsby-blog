# Error Handling in React app
- when a `promise` is rejected, we add a handler via the `catch` method
	- often utilized by placing deeper within the promise chain
	- can be used to define a handler function at the end of the promise chain
		- called once any promise in the chain throws an error and the promise becomes rejected
```js
axios
  .put(`${baseUrl}/${id}`, newObject)
  .then(response => response.data)
  .then(changedNote => {
    // ...
  })
  .catch(error => {
    console.log('fail')
  })
```

Footer
---
Source:
Keywords: #react 
Related: [[React MOC]]