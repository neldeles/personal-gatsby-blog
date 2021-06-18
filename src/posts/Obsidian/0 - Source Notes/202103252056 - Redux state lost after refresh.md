---
aliases:
tags: ['react', 'redux']
references:
- 'https://fullstackopen.com/en/part7/exercises_extending_the_bloglist#exercises-7-9-7-21'
---

# Redux state lost after refresh

## Solution 1
Add a conditional render:
```js
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const id = useParams().id
  const user = useSelector(({ users }) => {
    return users.find((n) => n.id === id)
  })
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
```

How this works is as each of your states is initialized, it will return your conditional render (`return null` part) until the relevant states are loaded.

![[CleanShot 2021-03-25 at 21.00.25.png]]

Here the relevant state is initialized by the action `INITIALIZE_USERS`. Once this completes, your conditional render becomes `false` and it renders normally.

# Footer
---
Related: 