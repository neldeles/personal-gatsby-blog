# References to components with ref
Let's say we store state hook within a component as explained in [[202102260938 - Storing state in components]]. We now need to access this state hook from another component—how do we do this?

In our example, our goal will be to hide the *create new note form* after creating a new note. With the way our app is currently constructed, this visibility is controlled with the `visible` variable inside the `Toggable` component. This is of course outside of our `App` component.

There are many ways to implement closing the form from the parent component, but let's use the [ref](https://reactjs.org/docs/refs-and-the-dom.html) mechanism of React, which offers a reference to the component.

We need to make the following changes in our `App` component:
```js
// after the change
import React, { useState, useRef } from 'react'

const App = () => {
  // ...
  // after the change
  const noteFormRef = useRef()

  const noteForm = () => (
    // after the change
    <Togglable buttonLabel='new note' ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  )

  // ...
}
```
The [useRef](https://reactjs.org/docs/hooks-reference.html#useref) hook is used to create a `noteFormRef` ref, that is assigned to the `Togglable` component containing the creation note form. The `noteFormRef` variable acts as a reference to the component. This hook ensures the same reference (ref) is kept throughout re-renders of the component.

We also make the following changes to the `Togglable` component:

```js
import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {  
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {    
  	return {      
		toggleVisibility    
	}  
  })
  
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

export default Togglable
```

The function that creates the component is wrapped inside of a [forwardRef](https://reactjs.org/docs/react-api.html#reactforwardref) function call. This way the component can access the ref that is assigned to it.

The component uses the [useImperativeHandle](https://reactjs.org/docs/hooks-reference.html#useimperativehandle) hook to make its `toggleVisibility` function available outside of the component. It is a React Hook used for defining functions in a component which can be invoked from outside of the component.

We can now hide the form by calling `noteFormRef.current.toggleVisibility()` after a new note has been created:

```js
const App = () => {
  // ...
  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()    noteService
      .create(noteObject)
      .then(returnedNote => {     
        setNotes(notes.concat(returnedNote))
      })
  }
  // ...
}
```
## Calling the reference
We can now hide the form by calling `noteFormRef.current.toggleVisibility()` after a new note has been created:

```js
const App = () => {
  // ...
  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()    noteService
      .create(noteObject)
      .then(returnedNote => {     
        setNotes(notes.concat(returnedNote))
      })
  }
  // ...
}
```
## Caveat
This trick works for changing the state of a component, but it looks a bit unpleasant. We could have accomplished the same functionality with slightly cleaner code using "old React" class-based components. We will take a look at these class components during part 7 of the course material. So far this is the only situation where using React hooks leads to code that is not cleaner than with class components.

There are also [other use cases](https://reactjs.org/docs/refs-and-the-dom.html) for refs than accessing React components.


Footer
---
Source: https://fullstackopen.com/en/part5/props_children_and_proptypes#references-to-components-with-ref
Keywords: #react 
Related:
- [[React MOC]]
- [[202102260938 - Storing state in components]]