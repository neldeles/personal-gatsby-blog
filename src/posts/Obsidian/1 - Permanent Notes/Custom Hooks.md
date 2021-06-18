# Custom Hooks
The primary purpose of custom hooks is to facilitate the reuse of the logic used in components.
> _Building your own Hooks lets you extract component logic into reusable functions._

They must always start with the word `use`.

## Recap on Rules of Using Hooks
**Don’t call Hooks inside loops, conditions, or nested functions.** Instead, always use Hooks at the top level of your React function.

**Don’t call Hooks from regular JavaScript functions.** Instead, you can:
-   Call Hooks from React function components.
-   Call Hooks from custom Hooks

There's an existing [ESlint](https://www.npmjs.com/package/eslint-plugin-react-hooks) rule that can be used to verify that the application uses hooks correctly. Note that `create-react-app` has configured this rule for us already.

## Where to save custom hooks
One natural place to save custom hooks of your application is in */src/hooks/index.js*. Multiple hooks will live in that file and you use [[202012041823 - Use export to Share a Code Block| named export]]. 
```js
import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

// modules can have several named exports
export const useAnotherHook = () => {
  // ...
}
```

You then import them into your component:
```js
import  { useField } from './hooks'

const App = () => {
  // ...
  const username = useField('text')
  // ...
}
```

## Sample counter application
Old:
```js
import React, { useState } from 'react'
const App = (props) => {
  const [counter, setCounter] = useState(0)

  return (
    <div>
      <div>{counter}</div>
      <button onClick={() => setCounter(counter + 1)}>
        plus
      </button>
      <button onClick={() => setCounter(counter - 1)}>
        minus
      </button>      
      <button onClick={() => setCounter(0)}>
        zero
      </button>
    </div>
  )
}
```

### Extract counter logic into custom hook
We extract the counter logic into its own custom hook:
```js
const useCounter = () => {
  const [value, setValue] = useState(0)

  const increase = () => {
    setValue(value + 1)
  }

  const decrease = () => {
    setValue(value - 1)
  }

  const zero = () => {
    setValue(0)
  }

  return {
    value, 
    increase,
    decrease,
    zero
  }
}
```
Our custom hook uses the `useState` hook internally to create its own state. The hook returns an object, the properties of which include the value of the counter as well as functions for manipulating the value.

### Using our custom hook
We can now reuse our custom hook in different components/applications.

Our old counter app becomes:
```js
const App = (props) => {
  const counter = useCounter()

  return (
    <div>
      <div>{counter.value}</div>
      <button onClick={counter.increase}>
        plus
      </button>
      <button onClick={counter.decrease}>
        minus
      </button>      
      <button onClick={counter.zero}>
        zero
      </button>
    </div>
  )
}
```
By doing this we can extract the state of the `App` component and its manipulation entirely into the `useCounter` hook. Managing the counter state and logic is now the responsibility of the custom hook.

This same custom hook could be reused in an app that keeps track of the amount of clicks made to left and right buttons:
```js
const App = () => {
  const left = useCounter()
  const right = useCounter()

  return (
    <div>
      {left.value}
      <button onClick={left.increase}>
        left
      </button>
      <button onClick={right.increase}>
        right
      </button>
      {right.value}
    </div>
  )
}
```

## Using custom hooks to simplify forms
The following app presents the user with a form that requests the user to input their name, birthday and height:
```js
const App = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [height, setHeight] = useState('')

  return (
    <div>
      <form>
        name: 
        <input
          type='text'
          value={name}
          onChange={(event) => setName(event.target.value)} 
        /> 
        <br/> 
        birthdate:
        <input
          type='date'
          value={born}
          onChange={(event) => setBorn(event.target.value)}
        />
        <br /> 
        height:
        <input
          type='number'
          value={height}
          onChange={(event) => setHeight(event.target.value)}
        />
      </form>
      <div>
        {name} {born} {height} 
      </div>
    </div>
  )
}
```
Every field of the form has its own state. In order to keep the state of the form synchronized with the data provided by the user, we have to register an appropriate `onChange` handler for each of the `input` elements.

### Defining our custom `useField` hook
We define a `useField` custom hook to simplify the state management of the form:
```js
/**
 * Returns all attributes required by `input` field: type, value onChange handler
 */
const useField = (type) => {
	
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}
```

### Using our custom hook
```js
const App = () => {
  const name = useField('text')
  // ...

  return (
    <div>
      <form>
        <input
          type={name.type}
          value={name.value}
          onChange={name.onChange} 
        /> 
        // ...
      </form>
    </div>
  )
}
```

A more succint way by using the [[202011300451 - JavaScript Spread Operator| spread]] operator:
```js
const App = () => {
  const name = useField('text')
  // ...

  return (
    <div>
      <form>
        <input {...name} /> 
        // ...
      </form>
    </div>
  )
}
```
We're able to use the *spread* operator because the `name` object has **exactly** all of the attributes that the `input` element expects to receive as props.

### Updated final form
Our app that contains our form gets simplified into the following format:
```js
const App = () => {
  const name = useField('text')
  const born = useField('date')
  const height = useField('number')

  return (
    <div>
      <form>
        name: 
        <input  {...name} /> 
        <br/> 
        birthdate:
        <input {...born} />
        <br /> 
        height:
        <input {...height} />
      </form>
      <div>
        {name.value} {born.value} {height.value}
      </div>
    </div>
  )
}
```

# Footer
---
Source: https://fullstackopen.com/en/part7/custom_hooks
Keywords: #react #programming 
Related:
- [[React MOC]]