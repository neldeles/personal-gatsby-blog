---
date: '2021-06-19T14:10:56'
tags: ['react-redux']
title: 
published: true
description:
aliases:
references: ['https://blog.jscrambler.com/async-dispatch-chaining-with-redux-thunk/', 'https://blog.isquaredsoftware.com/2020/01/blogged-answers-redux-batching-techniques/']
---

# batch() vs promise.all in react-redux
This is what `batch()` looks like:
```js
useEffect(() => {
  batch(() => {
	dispatch(initializeDashboard());
	dispatch(initializeCategoryGroup());
	dispatch(initializeBudget());
  });
}, [dispatch]);
```

This is what `promise.all()` looks like: 
```js
await Promise.all([
 dispatch({
   type: "INIT_DASHBOARD",
   data,
 }),
 dispatch(initializeCategoryGroup()),
 dispatch(initializeBudget()),
]);
```

My understanding of when you'd use one over the other is you use `promise` if you need to know when all calls finish so we can do something else afterwards. Maybe for example you initialize a loading animation, then render the UI after all calls have finished.

# Footer
---
Related: 