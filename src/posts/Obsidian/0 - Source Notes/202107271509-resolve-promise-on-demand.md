---
date: '2021-07-27T15:09:07'
tags: ['testing', 'utility', 'epicreact']
title: 
published: true
description:
aliases:
references:
---

# Resolve or Reject a promise on demand

When testing, you may want to delay a promise to test something, i.e. a loading screen.

Can use this function to do so: 

```js
function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

// 💰 Here's an example of how you use this:
// const {promise, resolve, reject} = deferred()
// promise.then(() => {/* do something */})
// // do other setup stuff and assert on the pending state
// resolve()
// await promise
// // assert on the resolved state
```

---
Related: 