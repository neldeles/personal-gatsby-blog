---
date: '2021-08-13T16:06:47'
tags: ['react-query']
title: 
published: true
description:
aliases:
references:
---

# Refresh data after mutation

```js
const [create] = useMutation(
    ({bookId}) => client(`list-items`, {data: {bookId}, token: user.token}),
    {onSettled: () => queryCache.invalidateQueries('list-items')},
)
```

When using `react-query`, after a mutation it does not update the cache automatically so your data may be stale. You therefore need to "invalidate" the previous query using the `onSettled` option and passing in `queryCache.invalidateQueries(queryKey)` as an argument. 

Source: Episode 255 of "Build an Epic React App"


# Footer
---
Related: 