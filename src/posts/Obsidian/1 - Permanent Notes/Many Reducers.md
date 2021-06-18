# Many Reducers
## Combined reducers (`.combineReducers()`)
When handling a `store` with complex states, you will most likely need multiple reducers. You can then combine them via the `.combineReducers()` function.

For example, given the ff desired (desired because this is how we want our state to be modeled) complex state:
```js
{
  notes: [
    { content: 'reducer defines how redux store works', important: true, id: 1},
    { content: 'state of store can contain any data', important: false, id: 2}
  ],
  filter: 'IMPORTANT'
}
```

You have 2  reducers, `noteReducer` and `filterReducer`, to handle the `state` for notes and filter respectively.

`noteReducer` is as follows:
```js
const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  },
]

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return state.concat(action.data)
    case 'TOGGLE_IMPORTANCE': {
      const id = action.data.id
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map(note =>
        note.id !== id ? note : changedNote
      )
    }
    default:
      return state
  }
}

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      important: false,
      id: generateId()
    }
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

export default noteReducer
```

`filterReducer` is as follows: 
```js
const filterReducer = (state = 'ALL', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter
    default:
      return state
  }
}

export const filterChange = filter => {
  return {
    type: 'SET_FILTER',
    filter,
  }
}

export default filterReducer
```

### Defining the combined reducer
You define the combined reducer in *index.js*:
```js
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux' 
import App from './App'

import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})

const store = createStore(reducer)

console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```
The state of the store defined by the reducer is an object with two properties: `notes` and `filter`. 
- the value of the `notes` property is defined by the `noteReducer`, which does not have to deal with the other properties of the state
- likewise, the `filter` property is managed by the `filterReducer`
```js
const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})
```

#### Important detail on actions and combined reducers
The combined reducer works in such a way that every *action* gets handled in **every** part of the combined reducer. This means the *action* is run in each individual reducer of the combined reducer.

Typically only one reducer is interested in any given action, but there are situations where multiple reducers change their respective parts of the state based on the same action.

## Implementation of the combined reducer
Now that we have our desired modeled state, how do we implement it with our app's functionality? 

We've created a `VisibilityFilter` component that dispatches the action to modify the `filter` property of our state. 

When that `filter` value changes, we need to re-render the notes displayed. Ergo, we need to modify our `Notes` component.

Previously, it fetched all notes:
```js
const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => state)

  return (
    <ul>
      {notes.map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={() =>
            dispatch(toggleImportanceOf(note.id))
          }
        />
      )}
    </ul>
  )
}
```
We update it so that it now fetches the notes that match our current `filter` state:
```js
const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(({ filter, notes }) => {
    if (filter === 'ALL') {
      return notes
    }
    return filter === 'IMPORTANT'
      ? notes.filter(note => note.important)
      : notes.filter(note => !note.important)
  })

  return (
    <ul>
      {notes.map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={() =>
            dispatch(toggleImportanceOf(note.id))
          }
        />
      )}
    </ul>
  )
}
```

## Redux DevTools
The state of the Redux-store and the action that changes it can be monitored from the console of the browser.

Install the [chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) first if you haven't.

Then install the library in your project:
```shell
npm install --save-dev redux-devtools-extension
```

Change the definition of the `store`. We also move `store` out of *index.js* and into its own *src/store.js* file.
```js
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})

const store = createStore(
  reducer,
  composeWithDevTools()
)

export default store
```

*index.js* now looks like:
```js
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

Footer
---
Source:
Keywords: #redux #react #programming 
Related:
- [[Redux]]
- [[React MOC]]