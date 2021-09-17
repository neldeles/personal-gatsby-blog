---
date: '2021-08-10T15:25:18'
tags: ['react']
title: 
published: true
description:
aliases:
references:
---

# Custom headers and configs
If you have a wrapper function wherein you want devs to be able to easily customize it with their own custom headers/configs, the ff is how you would implement it:

```js
const apiURL = process.env.REACT_APP_API_URL

function client(
  endpoint,
  {token, headers: customHeaders, ...customConfig} = {},
) {
  const config = {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      ...customHeaders,
    },
    ...customConfig,
  }

  return window.fetch(`${apiURL}/${endpoint}`, config).then(async response => {
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export {client}
```

**Source**: video 245 of epicreact, part of "Build an Epic React App" module.

# Footer
---
Related: 