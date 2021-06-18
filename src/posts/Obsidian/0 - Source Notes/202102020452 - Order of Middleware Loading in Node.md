# Order of Middleware Loading in Node
The execution order of middleware is the same as the order that they are loaded into express with the _app.use_ function. For this reason it is important to be careful when defining middleware.

The correct order is the following:

```js
app.use(express.static('build'))
app.use(express.json())
app.use(logger)

app.post('/api/notes', (request, response) => {
  const body = request.body
  // ...
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  // ...
}

// handler of requests with result to errors
app.use(errorHandler)
```
- the middleware for handling unsupported routes should be next to the last middleware that is loaded into Express
- `errorHandler` needs to come at the very end

Footer
---
Source:
Keywords: #node #express
Related:
- [[MongoDB Setup for Node]]