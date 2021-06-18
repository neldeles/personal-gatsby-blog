# Review of How React Apps Work using React Hooks
```js
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const [counter, setCounter] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)


  return (
    <div>
      <Display counter={counter} />
      <Button
        handleClick={increaseByOne}
        text='plus'
      />
      <Button
        handleClick={setToZero}
        text='zero'
      />
      <Button
        handleClick={decreaseByOne}
        text='minus'
      />
    </div>

  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```
`App` code is executed. Uses `useState` hook to create the application state. Initial state is `counter=0`. This is displayed using the `Display` component. 

`App` also contains three `Button` components which have event handlers which can be used to change the state. When button is clicked, the event handler is executed and it changes the state of the `App` component via the `setCounter` function. ==Calling a function which changes the state causes the component to re-render.==

> So, if a user clicks the _plus_ button, the button's event handler changes the value of _counter_ to 1, and the _App_ component is rerendered. This causes its subcomponents _Display_ and _Button_ to also be re-rendered. _Display_ receives the new value of the counter, 1, as props

# Footer
---
Source:
Keywords: #programming #react 
Related: