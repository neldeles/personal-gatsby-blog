---
date: '2021-07-06T13:23:35'
tags: ['jest']
title: jest mock function 
published: true
description:
aliases:
references:['https://testingjavascript.com/lessons/jest-ensure-functions-are-called-correctly-with-javascript-mocks']
---

# jest mock function
A simplified explanation of the jest mock function's inner workings is that it accepts an implementation, executes this implementation, and keeps track of the arguments.

```js
function fn(impl) {
	const mockFn = (...args) => {
		mockFn.mock.calls.push(args)	
		return impl(...args)
	}
	mockFn.mock = {calls: []}
	return mockFn
}
```

One use case for mock functions is to verify the function we called in our tests was called correctly. This requires keeping track of how often the function was called and what arguments it was called with. That way we can make assertions on how many times it was called and ensure it was called with the right arguments.

# Footer
---
Related: 