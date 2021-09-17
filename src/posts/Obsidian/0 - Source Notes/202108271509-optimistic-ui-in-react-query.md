---
date: '2021-08-27T15:09:47'
tags: ['react-query']
title: 
published: true
description:
aliases:
references:
---

# Optimistic UI in React Query

```js
const defaultMutationOptions = {
  // assume any onMutation function that returns a function is a recover function
  // this is our default onError handler
  onError(err, variables, recover) {
    if (typeof recover === 'function') {
      recover()
    }
  },
  onSettled: () => queryCache.invalidateQueries('list-items'),
}

function useUpdateListItem(user, options) {
  return useMutation(
    updates =>
      client(`list-items/${updates.id}`, {
        method: 'PUT',
        data: updates,
        token: user.token,
      }),
    {
      onMutate(newItem) {
		// getting a handle of current value in cache
        const previousItems = queryCache.getQueryData('list-items')
		// our optimistic update
        queryCache.setQueryData('list-items', old => {
          return old.map(item => {
            return item.id === newItem.id ? {...item, ...newItem} : item
          })
        })
		// return a recovery function that our default onError handler can handle
		// our recovery function resets query cache data to what it was before the error occurred
        return () => queryCache.setQueryData('list-items', previousItems)
      },
      ...defaultMutationOptions,
      ...options,
    },
  )
}
```

TLDR: Use `onMutate` to get those updates we are performing and before we perform our optimistic update, we get a handle of our current value in the cache. We then perform the optimistic update. 

How it works is we `setQueryData` for our `query` `list-items`. We pass in a function as the argument for the data to be returned. It takes the old items, and for each item, we return the original item if it's not what we're updating *or* the updated version of the item. 

We then return a recovery function.

Source: Lesson 276 in *Build an Epic React App*

# Footer
---
Related: 
- [202108271507-optimistic-ui](202108271507-optimistic-ui.md)