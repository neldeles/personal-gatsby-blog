# async/await
Introduced in ES7, the [Async/await syntax](https://facebook.github.io/jest/docs/en/asynchronous.html) can be used for writing asynchronous code with the appearance of synchronous code. Allows us to work around callback hell that *promises* can unravel to.

Normally we would have to use callback functions to access the data returned by promises, but with the new syntax things are a lot more comfortable:

```js
const response = await api.get('/api/notes')

// execution gets here only after the HTTP request is complete
// the result of HTTP request is saved in variable response
expect(response.body).toHaveLength(2)
```
## Important details
- in order to use the await operator with asynchronous operations, they have to return a promise
	- this is not a problem as such, as regular asynchronous functions using callbacks are easy to wrap around promises
- await keyword can't be used just anywhere in JavaScript code
	- using await is possible only inside of an [async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) function

## Promise chaining vs async/await
Using promise chaining:
```js
Note.find({})
  .then(notes => {
    return notes[0].remove()
  })
  .then(response => {
    console.log('the first note is removed')
    // more code here
  })
```
Using async/await:
```js
const main = async () => {
  const notes = await Note.find({})
  console.log('operation returned the following notes', notes)

  const response = await notes[0].remove()
  console.log('the first note is removed')
}

main()
```
The code declares that the function assigned to _main_ is asynchronous. After this the code calls the function with `main()`.

## Error handling with async/await
With async/await the recommended way of dealing with exceptions is the old and familiar `try/catch` mechanism: 
```js
notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })
  
  // note.save()
  //  .then(savedNote => {
  //    response.json(savedNote)
  //  })
  //  .catch(error => next(error))
  
  try { 
    const savedNote = await note.save()
    response.json(savedNote)
  } catch(exception) {
    next(exception)
  }
})
```
### The express-async-errors library
We can refactor error-handling use this library such that we eliminate the `catch` clause.
```bash
npm install express-async-errors
```
Import it in your app.js file:
```js
const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

// ...

module.exports = app
```
Because of the library, we do not need the `next(exception)` call anymore. The library handles everything under the hood. If an exception occurs in a _async_ route, the execution is automatically passed to the error handling middleware.
```js
notesRouter.delete('/:id', async (request, response, next) => {
  try {
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})
```

becomes

```js
notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
```
Footer
---
Source:
Keywords: #javascript #es7
Related:
- [[Testing Node applications - 1 - Backend]]
- [[202012101730 - Create a JavaScript Promise]]