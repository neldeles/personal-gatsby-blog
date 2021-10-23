---
date: '2021-09-02T18:05:56'
tags: ['react', 'react/context']
title: 
published: true
description:
aliases:
references:
---

# Colocating global providers
Typically in applications, you'll have several context providers that are global or near-global. Most of the time, it's harmless to just make them all global and create a single provider component that brings them all together. In addition to general "cleanup", this can help make testing easier.

Inside the `src/context/index.js` module create an `AppProviders` component that:
-   accepts a `children` prop
-   renders all the context providers for our app
-   pass the children along to the last provider

`src/context/index.js` will look something Iike this:
```js
import * as React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {ReactQueryConfigProvider} from 'react-query'
import {AuthProvider} from './auth-context'

const queryConfig = {
  retry(failureCount, error) {
    if (error.status === 404) return false
    else if (failureCount < 2) return true
    else return false
  },
  useErrorBoundary: true,
  refetchAllOnWindowFocus: false,
}

function AppProviders({children}) {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Router>
        <AuthProvider>{children}</AuthProvider>
      </Router>
    </ReactQueryConfigProvider>
  )
}

export {AppProviders}
```

To use this provider component:
```js
// src/index.js
import {loadDevTools} from './dev-tools/load'
import './bootstrap'
import * as React from 'react'
import ReactDOM from 'react-dom'
import {AppProviders} from './context'
import {App} from './app'

loadDevTools(() => {
  ReactDOM.render(
    <AppProviders>
      <App />
    </AppProviders>,
    document.getElementById('root'),
  )
})
```

# Footer
---
Related: 