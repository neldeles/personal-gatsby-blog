# Extracting communication with the backend into a separate module
- save it in `src/services/fileName.js`
- makes heavy use of `promises`

Non-refactored:
```js
// App.js
addNote = event => {
  event.preventDefault()
  const noteObject = {
    content: newNote,
    date: new Date(),
    important: Math.random() > 0.5,
  }

  axios
    .post('http://localhost:3001/notes', noteObject)
    .then(response => {
      setNotes(notes.concat(response.data))      setNewNote('')    })
}
```
Extracted from `App.js` into a separate module:
```js
// src/services/notes.js
import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  // `then` method of a promise also returns a promise
  return request.then(response => response.data)
}

export default {
  create: create
}
```
```js
// changes in App.js fro refactored version
const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }
	// axios nested promise in another promise
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }
```
Notice how in the non-refactored version, the `axios` object is already making use of `promises`. In the refactored version, that `axios` promise is nested inside an outer `promises` layer in `App.js`


Footer
---
Source:
Keywords: #axios
Related:
- [[React MOC]]
- [[202012101800 - Complete a Promise with Resolve and Reject]]