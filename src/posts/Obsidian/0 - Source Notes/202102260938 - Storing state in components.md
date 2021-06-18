# Storing state in components
React documentation says the [following](https://reactjs.org/docs/lifting-state-up.html) about where to place the state:

> _Often, several components need to reflect the same changing data. We recommend lifting the shared state up to their closest common ancestor._

If we think about the state of the forms, so for example the contents of a new note before it has been created, the _App_ component does not actually need it for anything. We could just as well move the state of the forms to the corresponding components.

The component for a note changes like so:

```js
import React, {useState} from 'react' 

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('') 

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: Math.random() > 0.5,
    })

    setNewNote('')
  }

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm
```
The _newNote_ state attribute and the event handler responsible for changing it have been moved from the _App_ component to the component responsible for the note form.

There is only one prop left, the _createNote_ function, which the form calls when a new note is created.

The _App_ component becomes simpler now that we have got rid of the _newNote_ state and its event handler. The _addNote_ function for creating new notes receives a new note as a parameter, and the function is the only prop we send to the form:

```js
const App = () => {
  // ...
  const addNote = (noteObject) => {
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }
  // ...
  const noteForm = () => (
    <Togglable buttonLabel='new note'>
      <NoteForm createNote={addNote} />
    </Togglable>
  )

  // ...
}
```


Footer
---
Source: https://fullstackopen.com/en/part5/props_children_and_proptypes#state-of-the-forms
Keywords: #react 
Related:
- [[React MOC]]