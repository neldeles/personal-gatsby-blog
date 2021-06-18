# React Components
## Functional Components
This is what we primarily use (instead of Class components). Allows us to take advantage of [[202101210617 - React Complex States|state hooks]] and [[202101230525 - React Effect Hooks|effect hooks]].


## Where to store components
Common practice is to declare each component in their own file as an ES6-module. In smallers projects you save it in: `src -> components -> ComponentName.js`

Example:
```js
import React from 'react'

const Note = ({ note }) => {
  return (
      <li>{note.content}</li>
  )
}

export default Note
```

If the component is the **root component**, such as `App`, you save it in: `src/App.js`

Footer
---
Source:
Keywords: #react #es6 
Related: 
- [[Fullstackopen Part 1 Synthesis]]