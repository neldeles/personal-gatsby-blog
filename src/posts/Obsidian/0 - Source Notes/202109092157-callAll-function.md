---
date: '2021-09-09T21:57:58'
tags: ['utility']
title: 
published: true
description:
aliases:
references:
---

# callAll function
```js
function callAll(...fns) {
  return (...args) => {
    fns.forEach(fn => {
      fn && fn(...args)
    })
  }
}
```
1. callAll accepts any # of functions as an argument. 
2. it returns a function that accepts any # of arguments
3. this returned function loops through each function in step 1, checks if it exists, and if it does, it will call that function with all the args

TLDR: it's a function you can call, passing in any # of functions, and returns a function that calls all of those functions.

Usecase is it allows you to group and succintly call multiple functions.

Old:
```js
function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // 🐨 Add a property called `togglerProps`. It should be an object that has
  // `aria-pressed` and `onClick` properties.
  // 💰 {'aria-pressed': on, onClick: toggle}
  function getTogglerProps({onClick, ...props} = {}) {
    return {
      'aria-pressed': on,
      onClick: () => {
        onClick && onClick()
        toggle()
      },
      ...props,
    }
  }

  return {on, toggle, getTogglerProps}
}
```

New:
```js
function callAll(...fns) {
  return (...args) => {
    fns.forEach(fn => {
      fn && fn(...args)
    })
  }
}

function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // 🐨 Add a property called `togglerProps`. It should be an object that has
  // `aria-pressed` and `onClick` properties.
  // 💰 {'aria-pressed': on, onClick: toggle}
  function getTogglerProps({onClick, ...props} = {}) {
    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props,
    }
  }
  
  return {on, toggle, getTogglerProps}
}
```

Source: lesson 111 from *"Advanced React Patterns"*

# Footer
---
Related: 