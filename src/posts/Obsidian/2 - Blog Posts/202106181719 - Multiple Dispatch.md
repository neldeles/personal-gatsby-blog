---
date: "2021-06-18T17:19:23"
tags: ["react-redux"]
title: Chaining multiple dispatches
published: true
description: "Chaining multiple dispatches in react-redux"
aliases:
references:
---

# Chaining multiple dispatches

```js
useEffect(() => {
  dispatch(initializeDashboard())
  dispatch(initializeCategoryGroup())
  dispatch(initializeBudget())
}, [dispatch])
```

This is what my code currently looked like. Was wondering if there was a way to streamline this.

I stumbled upon two options:

1. [Batch them using the _redux-batched-actions_ library](https://github.com/reduxjs/redux/issues/959)
2. [Use async](https://blog.jscrambler.com/async-dispatch-chaining-with-redux-thunk/)

For my project, I decided to use async. This is how it looks like:

```js
export const initializeDashboard = () => {
  return async (dispatch, getState) => {
    const user = await dashboardService.getUser(generateTokenConfig())
    const data = {
      user,
      currDate: moment().format("LL"),
    }

    await Promise.all([
      dispatch({
        type: "INIT_DASHBOARD",
        data,
      }),
      dispatch(initializeCategoryGroup()),
      dispatch(initializeBudget()),
    ])

    console.log("state after initialization", getState())
  }
}
```

# Footer

---

Related:
