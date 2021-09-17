---
date: '2021-08-27T14:58:08'
tags: ['react-query']
title: 
published: true
description:
aliases:
references:
---

# Add query data to query cache
Let's say you have data that is shared between two different queries A and B. Since there's overlapping data, you can add to the query cache of B the data coming from A.

I.e.  when the search for books is successful, we can take the array of books we get back and push them into the query cache with the same query key we use to retrieve them out of the cache for the book page.

To do this, we can add an `onSuccess` handler to our book search query config. We'll want to do something similar for the list items (because the book data comes back with the list item as well). So when either request is successful, you'll want to set the book data in the query cache for that book by it's ID.

```js
const getBookSearchConfig = (query, user) => ({
  queryKey: ['bookSearch', {query}],
  queryFn: () =>
    client(`books?query=${encodeURIComponent(query)}`, {
      token: user.token,
    }).then(data => data.books),
  config: {
    onSuccess(books) {
      for (const book of books) {
        setQueryDataForBook(book)
      }
    },
  },
})

function useBookSearch(query, user) {
  const result = useQuery(getBookSearchConfig(query, user))
  return {...result, books: result.data ?? loadingBooks}
}

function setQueryDataForBook(book) {
  queryCache.setQueryData(['book', {bookId: book.id}], book)
}
```

Source: Episode 275 of *"Build an Epic React App"*


# Footer
---
Related: 