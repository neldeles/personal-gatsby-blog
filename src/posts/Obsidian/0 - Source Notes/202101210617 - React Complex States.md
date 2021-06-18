# React Complex States 
A component's state or a piece of its state can be of any type. The simplest form is as a primitive, for example an integer:
```js
const [left, setLeft] = useState(0)
```
But it can even be an object or array:
```js
// create dynamic array with n 0's
const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))
```

Footer
---
Source:
Keywords: #react 
Related: