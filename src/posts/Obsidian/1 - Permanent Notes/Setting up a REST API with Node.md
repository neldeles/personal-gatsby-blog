# Setting up a REST API with Node

## Fetching a resource aka `get`
Define the route method for your `get` HTTP method:
```js
app.get('/api/notes/:id', (request, response) => {
  // id parameter of the route (:id)
  // need to convert to Number since note.id is of type Number
  const id = Number(request.params.id)
  const note = notes.find(note => {
    console.log(note.id, typeof note.id, id, typeof id, note.id === id)
    return note.id === id
  })
  console.log(note)
  // if-statement to handle searching for note 
  //  with an id that doesn't exist (note returns undefined)
  if (note) {    
    response.json(note)  
  } else {    
    response.status(404).end()
  }
})
```

## Deleting resource 
Define the route method for `delete` HTTP method:
```js
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  
  // we can also use 404 instead
  response.status(204).end()
})
```

## Receiving data aka handling `POST`
### Setup so we can check if data and server are working
We use express's `json-parser` in order to easily access the data:
```js
const express = require('express')
const app = express()

// json-parser
app.use(express.json())

//...

// route method/initial handler for dealing with HTTP POST request
app.post('/api/notes', (request, response) => {
  const note = request.body
  console.log(note)

  response.json(note)
})
```
- event handler function can access the data from the `body` property of the `request` object
> Without the json-parser, the _body_ property would be undefined. The json-parser functions so that it takes the JSON data of a request, transforms it into a JavaScript object and then attaches it to the _body_ property of the _request_ object before the route handler is called.
### Checking with Postman
We check via Postman if the data is being received by the server:
![[14ea.png]]

Make sure to define
- url
- request type
- Body
### Finalizing app's handling of request
Once we've verified that the app aka server is receiving data correctly, we finalize the handling of the request:
```js
const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body
	
  // if received data is missing the content property
  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})
```

Footer
---
Source: https://fullstackopen.com/en/part3/node_js_and_express#fetching-a-single-resource
Keywords: #programming #node #rest #setup
Related:
- [[Node MOC]]
- [[Quick Start - Node and Express]]