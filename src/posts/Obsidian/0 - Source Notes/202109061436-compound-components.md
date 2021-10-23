---
date: '2021-09-06T14:36:37'
tags: ['react', 'compound-components', 'components', 'react/context']
title: Compound Components
published: true
description:
aliases: [compound components]
references: ['https://kentcdodds.com/blog/inversion-of-control', 'https://www.youtube.com/watch?v=AiJ8tRRH0f8&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf']
---

# Compound Components

One of the tenets of the **compound components** pattern is [202109241638-inversion-of-control](202109241638-inversion-of-control.md):
> "Make your abstraction do less stuff, and make your users do that instead."

> When you're thinking about how to create a nice API for people who are trying to do things slightly differently, instead of reaching for `if` statements and ternaries, consider the possibility of inverting control. In this case, what if we just gave rendering responsibility to the user of our menu? Let's use one of React's greatest strengths of composibility:

```jsx
function App() {
  return (
    <Menu>
      <MenuButton>
        Actions <span aria-hidden>▾</span>
      </MenuButton>
      <MenuList>
        <MenuItem onSelect={() => alert('Download')}>Download</MenuItem>
        <MenuItem onSelect={() => alert('Copy')}>Create a Copy</MenuItem>
        <MenuItem onSelect={() => alert('Delete')}>Delete</MenuItem>
      </MenuList>
    </Menu>
  )
}
```

> The key thing to notice here is that there's no state visible to the user of the components. The state is implicitly shared between these components. That's the primary value of the compound components pattern. By using that capability, we've given some rendering control over to the user of our components and now adding an extra line in there (or anything else for that matter) is pretty trivial and intuitive. No API docs to look up, and no extra features, code, or tests to add. Big win for everyone.

Now how do we actually implement this in React? There are 2 ways that I've learned of, both somewhat connected. The first is the "rigid" compound component, and the second is the "flexible" compound component.

## "Rigid" compound component

This method makes use of React's [cloneElement](202109241521-cloneElement.md) function to implicitly share state and/or any other functions the child components will need access to.

```jsx
// Compound Components
// http://localhost:3000/isolated/final/02.js

import * as React from 'react'
import {Switch} from '../switch'

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)
  return React.Children.map(children, child =>
    React.cloneElement(child, {on, toggle}),
  )
}

function ToggleOn({on, children}) {
  return on ? children : null
}

function ToggleOff({on, children}) {
  return on ? null : children
}

function ToggleButton({on, toggle, ...props}) {
  return <Switch on={on} onClick={toggle} {...props} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <ToggleButton />
      </Toggle>
    </div>
  )
}

export default App
```
[In this example](hook://file/3fj6RL9Lw?p=c3JjL2ZpbmFs&n=02.js), the user is given a set of the ff "lego" pieces to build his toggle: 
- Parent
  - `Toggle`
- Children:
  -  `ToggleOn`, `ToggleOff`, and `ToggleButton` 
  
Since the `Toggle` parent manages the state and we've implicitly shared this state(`on`) to the *children* pieces via `cloneElement()`, the user now has control over the presentation of the UI without needing to worry about functionality. He can freely move the button at the top/bottom etc.

### Why use cloneElement()?

You may be wondering why use `cloneElement` to begin with? 
![](CleanShot-2021-09-24-at-20.11.10@2x.png)
It's because you can't modify the props of children directly. It will result in the error above. Hence we work around this by using `cloneElement()`.
  
## Flexible compound component

 The problem with the "rigid" method is that the component can only clone and pass props to immediate children. 
 
 With the flexible method, they will be able to implicitly accept the `on` state and `toggle` method regardless of where they're rendered within the `Toggle` component's "posterity". 
 
 This is done with the help of [useContext](202103212300%20-%20`useContext`.md).
 
## Dot notation
While it isn't required, it can be wise to use dot notation when working with compound components to explicitly communicate the relationship between the components.

```jsx
function App() {
  return (
    <Toggle onToggle={on => console.log(on)}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <Toggle.Button />
    </Toggle>
  )
}
```

[There are 2 ways to implement this](https://stackoverflow.com/questions/60882627/using-dot-notation-with-functional-component). The first is by attaching the compound component as a property to the parent component.
```jsx
// Card.react.js
const Card = ({ children }) => <>{children}</>;
const Body = () => <>Body</>;

Card.Body = Body;
export default Card;

// Usage
import Card from "./Card.react.js";

const App = () => (
  <Card>
    <Card.Body />
  </Card>
);
```

The second way is by taking advantage of named exports:
```jsx
// Card.react.js
export const Wrapper = ({ children }) => <>{children}</>;
export const Body = () => <>Body</>;

// Usage
import * as Card from "./Card.react.js";

const App = () => (
  <Card.Wrapper>
    <Card.Body />
  </Card.Wrapper>
);
```

[Kent Dodd's uses the first method](https://kentcdodds.com/blog/compound-components-with-react-hooks/).



# Footer
---
Related:
