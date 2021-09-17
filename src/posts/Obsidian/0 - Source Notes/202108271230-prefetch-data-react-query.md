---
date: '2021-08-27T12:30:57'
tags: ['react-query']
title: 
published: true
description:
aliases:
references:
---

# Prefetch data in React Query
Right now, open up the app and do this:

1.  Go to the discover page.
2.  Add the first book that comes back to your list (without typing in the search)
3.  Click that book
4.  Click the back button
5.  Notice that the book you added is in the search results for a moment and then disappears.

The reason this happens is because react-query has cached our search for an empty string and when the user returns to this page they're looking at cached results. However, the server will respond with only books that are _not_ in the user's reading list already. So while we're looking at the stale data, react-query validates that stale data, finds that the data was wrong and we get an update.

This isn't a great user experience. There are various things we can do to side-step this. We could clear the react-query cache (something worth trying if you want to give that a go, be my guest!). But instead, what we're going to do is when the user leaves the discover page, we'll trigger a refetch of that query so when they come back we have the search pre-cached and the response is immediate.

To do this, you'll need a `refetchBookSearchQuery` function in the `books.js` util and an effect cleanup that calls this utility in the `discover.js` component.

📜 You'll want to use `react-query`'s `queryCache.prefetchQuery` and `queryCache.removeQueries` functions:

-   [https://react-query-v2.tanstack.com/docs/api#querycacheremovequeries](https://react-query-v2.tanstack.com/docs/api#querycacheremovequeries "https://react-query-v2.tanstack.com/docs/api#querycacheremovequeries")
-   [https://react-query-v2.tanstack.com/docs/api#querycacheprefetchquery](https://react-query-v2.tanstack.com/docs/api#querycacheprefetchquery "https://react-query-v2.tanstack.com/docs/api#querycacheprefetchquery")

Code:
```js
import {useQuery, queryCache} from 'react-query'

const getBookSearchConfig = (query, user) => ({
  queryKey: ['bookSearch', {query}],
    queryFn: () =>
      client(`books?query=${encodeURIComponent(query)}`, {
        token: user.token,
      }).then(data => data.books),
})

function refetchBookSearchQuery(user) {
  queryCache.removeQueries('bookSearch')
  queryCache.prefetchQuery(getBookSearchConfig('', user))
}

export {refetchBookSearchQuery}
```

Source: Lesson 274 of *"Build an Epic React App"*

# Footer
---
Related: 