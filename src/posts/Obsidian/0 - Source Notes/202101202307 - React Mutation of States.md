# React Mutation of States
**Important:** _It is forbidden in React to mutate state directly_, since it can result in unexpected side effects. This means you should always change state by **setting the state to a new object** (adhering to functional programming).

For example:
```js
// we use concat which creates a copy and new array
const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }
  
// using push would be incorrect since it modifies the array vs creating a new object
const handleLeftClick = () => {
  allClicks.push('L')
  setAll(allClicks)
  setLeft(left + 1)
}
```

Footer
---
Source:
Keywords: #react 
Related: