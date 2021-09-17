---
date: '2021-09-04T22:06:13'
tags: ['react-hooks']
title: 
published: true
description:
aliases:
references:
---

# Authentication hook
Multiple components may need to access the user which provides the token so we can access certain endpoints. Can create a `useClient` hook that handles this so the components no longer need to concern themselves with this implementation detail.

```js
function useAuth() {
  const context = React.useContext(AuthContext)

  if (context === undefined) {
    throw new Error(`useAuth must be used within an AuthProvider`)
  }

  return context
}

function useClient() {
  const {
    user: {token},
  } = useAuth()
  return React.useCallback(
    (endpoint, config) => client(endpoint, {...config, token}),
    [token],
  )
}

export {AuthProvider, useAuth, useClient}
```

Source: Lesson 285 of *"Build an Epic React App"*

# Footer
---
Related: 