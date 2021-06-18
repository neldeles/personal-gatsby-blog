# Communicating with server in a redux application
We expand our notes redux application such that the notes are stored to the backend.

## json-server
### Create your `db.json` file
At root of your project, create a *db.json* file. For examples:
```json
{
  "notes": [
    {
      "content": "the app state is in redux store",
      "important": true,
      "id": 1
    },
    {
      "content": "state changes are made with actions",
      "important": false,
      "id": 2
    }
  ]
}
```

### Install json-server
![[Quick Start - React#Quick Backend for Front-End Prototyping via JSON Server]]

## Fetch data from server
We create a method into the file *services/notes.js*, which uses *Axios* to fetch data from the backend:
```js
import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll }
```

### Initialize fetched data
We decide that initialization of the fetched data will happen in our `App` component. So we `import` *services/notes.js* here as `noteService` to fetch our data.

Using `noteService` we initialize our data using the new action creator function `initializeNotes` we added in our `noteReducer`.

Our updated `noteReducer`:
```js
// ...
const noteReducer = (state = [], action) => {
  console.log('ACTION:', action)
  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.data]
    case 'INIT_NOTES':
      return action.data
    // ...
  }
}

export const initializeNotes = (notes) => {
  return {
    type: 'INIT_NOTES',
    data: notes,
  }
}

// ...
```

Initializing our data in `App.js`. This sets our initial state to an array of notes in our backend.
```js
 noteService
      .getAll().then(notes => dispatch(initializeNotes(notes)))
```

When fetching and initializing data from the server, we can use the [[202101230525 - React Effect Hooks| effect]] hook:
```js
import React, {useEffect} from 'react'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'
import noteService from './services/notes'
import { initializeNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    noteService
      .getAll().then(notes => dispatch(initializeNotes(notes)))
  }, [])

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App
```
Using the useEffect hook causes an eslint-warning:

![[26ea.png]]

We can get rid of it by doing the following:
```js
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    noteService
      .getAll().then(notes => dispatch(initializeNotes(notes)))
  }, [dispatch])
  // ...
}
```

Now the variable _dispatch_ we define in the `App` component, which practically is the dispatch function of the redux-store, has been added to the array `useEffect` receives as a parameter. **If** the value of the dispatch-variable would change during runtime, the effect would be executed again. This however cannot happen in our application, so the warning is unnecessary.

## Creating a new note
We can do the same thing when it comes to creating a new note. Let's expand the code communicating with the server as follows:
```js
const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, important: false }
  const response = await axios.post(baseUrl, object)
  return response.data
}

export default {
  getAll,
  createNew,
}
```

The method `addNote` of the component `NewNote` changes slightly:
```js
import React from 'react'
import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducer'
// new import
import noteService from '../services/notes'

const NewNote = (props) => {
  const dispatch = useDispatch()
  
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
		// we add this to create the new note in our backend
    const newNote = await noteService.createNew(content)
    dispatch(createNote(newNote))
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  )
}

export default NewNote
```

## Asynchronous actions and redux thunk
Problem with the above implementation is **it is not ideal** that communication with the server happens inside the functions of the components. 

Ideally, this communication is abstracted away from the components such that they'll only have to call the appropriate *action creator*.

For example, old implementations of *App.js*:
```js
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    noteService
      .getAll().then(notes => dispatch(initializeNotes(notes)))
  }, [dispatch])

  // ...
}
```

New implementation of *App.js*:
```js
const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeNotes()))  
  },[dispatch]) 

  // ...
}
```

### redux-thunk setup
We can implement this by creating **asynchronous** actions with the *redux-thunk* library:
```shell
npm install redux-thunk
```
Note that you need to be using *redux* in order to use *redux-thunk*.

The *redux-thunk* library is a so-called *redux-middleware* which ==must beinitialized along with the initialization of the store==.

Our *src/store.js* thus becomes:
```js
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
})

const store = createStore(
  reducer,
	// initializing redux-thunk along w store via applyMiddleware
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
```

### Defining asynchronous action creators
Thanks to redux-thunk, it is possible to define _action creators_ so that they return a function having the _dispatch_-method of redux-store as its parameter, instead of returning an action object. 

As a result of this, one can make asynchronous action creators, which first wait for some operation to finish, after which they then dispatch the real action.

#### initializeNotes
For example, `initializeNotes` action creater becomes:
```js
export const initializeNotes = () => {
	// 1 and 2
  return async dispatch => {
		// 3
    const notes = await noteService.getAll()
		// 4
    dispatch({
      type: 'INIT_NOTES',
      data: notes,
    })
  }
}
```
1. Returns function instead of action object
2. Receives store's `dispatch` method as a parameter
3. Our asynchronous operation
4. `dispatch` used to dispatch reuglary synchronous actions inside the function's body once asynchronous operations completed (step 3)

#### createNote
Old:
```js
export const createNote = (content) => {
	return {
		type: 'NEW_NOTE',
		data: content
	}
}
```

New:
```js
export const createNote = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNote(content)
    dispatch({
      type: 'NEW_NOTE',
      data: newNote,
    })
  }
}
```


Footer
---
Source: https://fullstackopen.com/en/part6/communicating_with_server_in_a_redux_application#exercises-6-13-6-14
Keywords: #programming #react #redux 
Related:
- [[React MOC]]
- [[Redux]]