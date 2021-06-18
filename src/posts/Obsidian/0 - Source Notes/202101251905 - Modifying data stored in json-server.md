# Modifying data stored in json-server
We make HTTP requests to the [[202101251908 - What is a resource|resource's]] unique URL. 2 different ways to do this:
1. *Replace* the entire resource with an HTTP PUT request
2. Only change *some* of the resource's properties with a HTTP PATCH request

**Example of a PUT request**
```js
const toggleImportanceOf = id => {
  const url = `http://localhost:3001/notes/${id}`
  const note = notes.find(n => n.id === id)
  const changedNote = { ...note, important: !note.important }

  axios.put(url, changedNote).then(response => {
    setNotes(notes.map(note => note.id !== id ? note : response.data))
  })
}
```
The first line defines the unique url for each note resource based on its id.

The array [find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) method is used to find the note we want to modify, and we then assign it to the _note_ variable.

After this we create a _new object_ that is an exact copy of the old note, apart from the important property.

Footer
---
Source:
Keywords: #react 
Related: [[React Basics of Working with Data from Server]]