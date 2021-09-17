---
date: '2021-08-26T13:48:57'
tags: [react-query]
title: 
published: true
description:
aliases:
references:
---

# React Query

## ReactQueryConfigProvider
Can use this to configure *react-query* to use error boundary we set up to be used globally.

In index.js:
```js
import {loadDevTools} from './dev-tools/load'
import './bootstrap'
import * as React from 'react'
import ReactDOM from 'react-dom'
import {ReactQueryConfigProvider} from 'react-query'
import {App} from './app'

const queryConfig = {
  queries: {
	// this is the error boundary we've set up
    useErrorBoundary: true,
	refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (error.status === 404) return false
      else if (failureCount < 2) return true
      else return false
    },
  },
}

loadDevTools(() => {
  ReactDOM.render(
    <ReactQueryConfigProvider config={queryConfig}>
      <App />
    </ReactQueryConfigProvider>,
    document.getElementById('root'),
  )
})
```

The `refetchOnWindowFocus` option controls whether query will fetch data again if Window is refocused.

Source: lesson 270 of "Build an Epic React App"

---
Related: 