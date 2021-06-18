# Redux
Architecture to make state management easier. 
## Key Concepts
State is separated completely from the React-components into its own stores. State in the store is changed via actions. The impact of the action to the state is defined using a reducer.

The key terms are:
- [[202103092004 - store (redux)| store]]
- [[202103092006 - actions (redux)| actions]]
- [[202103092007 - reducer (redux)| reducer]]

### Key methods
- `store.dispatch({actionKey: actionValue })`
	- store uses the reducer to handle *actions*, which are dispatched to the store with the `dispatch` method
- `store.getState()`
	- find out state of the store
- `store.subscribe()`
	- used to create callback functions the store calls ==when its state is changed==
	- for example:
```js
store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})
```
The above callback function in layman's terms: *whenver state in store changes, print state of store to the console*

## Redux in action
### Installl redux:
```shell
npm install redux
```

### Sample increment app
Change *index.js* to the ff. *App.js* isn't used until [[#Forwarding Redux store to various components]].
```js
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}

const store = createStore(counterReducer)

const App = () => {
  return (
    <div>
      <div>
        {store.getState()}
      </div>
      <button 
        onClick={e => store.dispatch({ type: 'INCREMENT' })}
      >
        plus
      </button>
      <button
        onClick={e => store.dispatch({ type: 'DECREMENT' })}
      >
        minus
      </button>
      <button 
        onClick={e => store.dispatch({ type: 'ZERO' })}
      >
        zero
      </button>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
```
**Notables**
- `App` renders the value of the counter by asking it from the store with the method `store.getState()`
- action handlers of the buttons *dispatch* the right actions to the store
- when the state in the store is changed, React is not able to automatically rerender the application
	- thus we have registered a function `renderApp`, which renders the whole app, to listen for changes in the store with the `store.subscribe` method
	- note that we have to immediately call the `renderApp` method. Without the call the first rendering of the app would never happen

## Sample simplified note application
### Save `reducer` in own module
Save reducer in own module at *src/reducers/noteReducer.js*:
```js
const noteReducer = (state = [], action) => {
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

export default noteReducer
```
### Install `deep-freeze` library
To make sure our reducer is [[202011300421 - Preventing Data Mutation| correctly defined as a pure function]], we install the `deep-freeze` library as a dev dependency:
```shell
npm install --save-dev deep-freeze
```
#### Create test for our reducer
We use the `deepFreeze()` function in our test for the reducer. We define our test in file *src/reducers/noteReducer.test.js*:
```js
import noteReducer from './noteReducer'
import deepFreeze from 'deep-freeze'

describe('noteReducer', () => {
  test('returns new state with action NEW_NOTE', () => {
    const state = []
    const action = {
      type: 'NEW_NOTE',
      data: {
        content: 'the app state is in redux store',
        important: true,
        id: 1
      }
    }

    deepFreeze(state)
    const newState = noteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.data)
  })

  test('returns new state with action TOGGLE_IMPORTANCE', () => {
    const state = [
      {
        content: 'the app state is in redux store',
        important: true,
        id: 1
      },
      {
        content: 'state changes are made with actions',
        important: false,
        id: 2
      }
    ]

    const action = {
      type: 'TOGGLE_IMPORTANCE',
      data: {
        id: 2
      }
    }

    deepFreeze(state)
    const newState = noteReducer(state, action)

    expect(newState).toHaveLength(2)
    expect(newState).toContainEqual(state[0])
    expect(newState).toContainEqual({
      content: 'state changes are made with actions',
      important: true,
      id: 2
    })
  })
})
```

##### Running the test
We can  [[Testing React apps#Running tests| run the test]] with the command:
```shell
npm test
```

### Action Creators
Functions that create actions are called [action creators](https://redux.js.org/tutorials/fundamentals/part-7-standard-patterns#action-creators). It is a Redux design pattern so we don't have to write the action object by hand every time.

Instead of
```js
toggleImportance = (id) => {
  store.dispatch({
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  })
}
```
our code becomes:
```js
const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

const App = () => {
  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    store.dispatch(createNote(content))
  }

  const toggleImportance = (id) => {
    store.dispatch(toggleImportanceOf(id))
  }

  return (
    // ...
  )
}
```

Note that action creators are defined in the same file as the relevant reducer. In the example above, our reducer is in *src/reducers/noteReducer.js*. So that file will now look like this:
```js
const noteReducer = (state = [], action) => {
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
Take note that we [normally exported](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) our action creators.

We can import into our *App.js* via:
```js
import { createNote, toggleImportanceOf } from './reducers/noteReducer'
```

### Forwarding Redux store to various components
Aside from the reducer, our application is in one file. This is of course not sensible, and we should separate `App` into its own module.

Now the question is, how can the `App` access the store after the move? And more broadly, when a component is composed of many smaller components, there must be a way for all of the components to access the store.

There are multiple ways to share the _store_ with different components. First we will look into the newest, and possibly the easiest way, using the [hooks](https://react-redux.js.org/api/hooks) api of the [react-redux](https://react-redux.js.org/) library.

#### Install react-redux
First we install *react-redux*
```bash
npm install react-redux
```

`react-redux` is a [[202103221746 - react-redux | binding library]] for `redux`. Ergo, you should have [[Redux#Installl redux | redux installed beforehand]].

#### Index.js
*index.js* using Redux becomes:
```js
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```
Few things to note:
- our reducer is imported and taken into use via `createStore` in this file
- we make the `App` component a child of Redux's `Provider` component
	- the `Provider` component makes the Redux `store` available to any of its children
	- we define the `store` in `Provider` `store` attribute

#### App.js
```js
import React from 'react'
import { 
  createNote, toggleImportanceOf
} from './reducers/noteReducer' 
import { useSelector, useDispatch } from 'react-redux'


const App = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => state)

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createNote(content))
  }

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id))
  }

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" /> 
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map(note =>
          <li
            key={note.id} 
            onClick={() => toggleImportance(note.id)}
          >
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
      </ul>
    </div>
  )
}

export default App
```

##### Key things to note:
```
import { createNote, toggleImportanceOf } from './reducers/noteReducer'
```
- action creators are imported in *App.js*

###### useDispatch hook
```js
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
	// ...
	const dispatch = useDispatch()
	// ...
}
```
- we now dispatch actions using the [useDispatch](https://react-redux.js.org/api/hooks#usedispatch) hook instead of calling the `dispatch()` method of the redux store
	- `useDispatch` hook provides any React component access to the dispatch function of the redux store defined in _index.js_. This allows all components to make changes to the state of the redux store.

###### useSelector hook
```js
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  // ...
  const notes = useSelector(state => state)
  // ...
	return (
		// ...
		{notes.map(note =>
			// ...
		)}
		// ...
	)
}
```
- we can access the notes stored in the store, aka access our `state`, with the `useSelector` hook of the react-redux library
- this is similar to using `store.getState()` e.g. before using `useSelector` this is how the code was defined:
```js
const store = createStore(noteReducer)

const App = () => {
  // ...
  const notes = useSelector(state => state)
  // ...
	return (
		// ...
		{store.getState().map(note =>
			// ...
		)}
		// ...
	)
}
```
`useSelector` receives a function as a parameter. The function, in turn, receives the current state as a parameter and it should return a selection of the state it wants to expose to the component.

Here we need all of the notes, so our selector function returns the whole state:
```js
state => state
```
Usually selector functions are a bit more interesting, and return only selected parts of the contents of the redux store. We could for example return only notes marked as important:
```js
const importantNotes = useSelector(state => state.filter(note => note.important)) 
```

#### More components
##### NewNote component
Creating a new note, which previously lived in the *App.js* component, we can separate into its own component (*src/components/NewNote.js*):
```js
import React from 'react'
import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducer'

const NewNote = (props) => {
  const dispatch = useDispatch()

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createNote(content))
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
Unlike with the React code we did without Redux, the event handler `addNote` for changing the state of the app (which now lives in Redux) has been moved away from the _App_ to a child component. The logic for changing the state in Redux is still neatly separated from the whole React part of the application and this is what makes it easy to store the event handler within the component. We can easily access state management since it is decoupled from *App*.

##### List of notes and displaying a single note
We also move into their own components displaying a list of notes and displaying a single note. They will live in the same *src/components/Notes.js* component file.
```js
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Note = ({ note, handleClick }) => {
  return(
    <li onClick={handleClick}>
      {note.content} 
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  )
}

const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => state)

  return(
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

export default Notes
```
`Note`, responsible for rendering a single note, is very simple, and is not aware that the event handler it gets as props dispatches an action. These kind of components are called [presentational](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) in React terminology.

`Notes`, on the other hand, is a [container](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) component, as it contains some application logic: it defines what the event handlers of the `Note` components do and coordinates the configuration of _presentational_ components, that is, the `Notes`.

##### Simplified App component
There is not much code left in *App*:
```js
const App = () => {

  return (
    <div>
      <NewNote />
      <Notes  />
    </div>
  )
}
```

# Footer
---
Source:
Keywords: #programming #react #redux 
Related:
- [[React MOC]]