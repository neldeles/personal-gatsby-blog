---
date: '2021-09-02T14:12:55'
tags: ['react', 'react-context']
title: 
published: true
description:
aliases:
references:
---

# Accessing React Context from a function
  Situation: You have a function that needs access to something in Context. There are 2 possible solutions.
  
  1. Pass along the context i.e. importing it and calling it within the component.
  2. Create a hook that consumes the context and returns the function you need to call. The function that is returned contains the Context data within its closure.

Number 2 will look something like this in code:
```js
import {useRefetchBookSearchQuery} from 'utils/books'

function DiscoverBooksScreen() {
	const refetchBookSearchQuery = useRefetchBookSearchQuery()
	
	React.useEffect(() => {
		return () => refetchBookSearchQuery()	
	}, [refetchBookSearchQuery])
}
```

Source: Lesson 281 of *"Build an Epic React App"*

---
Related: 