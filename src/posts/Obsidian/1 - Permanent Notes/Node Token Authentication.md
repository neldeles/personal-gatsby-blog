# Node Token Authentication
The principles of token based authentication are depicted in the following sequence diagram:
![[16e.png]]

## Implement login functionality
Install the [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) library, which allows us to generate [JSON web tokens](https://jwt.io/).

```bash
npm install jsonwebtoken
```

The code for login functionality goes to the file controllers/login.js.
```js
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
```
The code starts by searching for the user from the database by the `username` attached to the request. Next, it checks the `password`, also attached to the request. Because the passwords themselves are not saved to the database, but _hashes_ calculated from the passwords, the `bcrypt.compare` method is used to check if the password is correct:
```js
await bcrypt.compare(body.password, user.passwordHash)
```
If the user is not found, or the password is incorrect, the request is responded to with the status code [401 unauthorized](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.2). The reason for the failure is explained in the response body.

If the password is correct, a token is created with the method _jwt.sign_. The token contains the username and the user id in a digitally signed form.
```js
const userForToken = {
  username: user.username,
  id: user._id,
}

const token = jwt.sign(userForToken, process.env.SECRET)
```
The token has been digitally signed using a string from the environment variable _SECRET_ as the _secret_. The digital signature ensures that only parties who know the secret can generate a valid token. ==The value for the environment variable must be set in the _.env_ file==.

Now the code for login just has to be added to the application by adding the new router to _app.js_.

```js
const loginRouter = require('./controllers/login')

//...

app.use('/api/login', loginRouter)
```

## Limiting creating new notes to logged in users
Creation of note will only be possible if the post request has a valid token attached. Note is then saved to the notes list of the user identified by the token.

### The Authorization header
There are several ways of sending the token from the browser to the server. We will use the [Authorization](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization) header. The header also tells which [authentication scheme](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#Authentication_schemes) is used. This can be necessary if the server offers multiple ways to authenticate. Identifying the scheme tells the server how the attached credentials should be interpreted.

The _Bearer_ scheme is suitable to our needs.

In practice, this means that if the token is for example, the string _eyJhbGciOiJIUzI1NiIsInR5c2VybmFtZSI6Im1sdXVra2FpIiwiaW_, the Authorization header will have the value:

```
Bearer eyJhbGciOiJIUzI1NiIsInR5c2VybmFtZSI6Im1sdXVra2FpIiwiaW
```

The *controllers/notes.js* file will change like so:
```js
const jwt = require('jsonwebtoken')

// ...
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

notesRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    date: new Date(),
    user: user._id
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.json(savedNote)
})
```

The helper function _getTokenFrom_ isolates the token from the _authorization_ header. The validity of the token is checked with _jwt.verify_. The method also decodes the token, or returns the Object which the token was based on:

```js
const decodedToken = jwt.verify(token, process.env.SECRET)
```

The object decoded from the token contains the `username` and `id` fields (which we defined in *controllers/login*), which tells the server who made the request.
### Checking with Postman
A new note can now be created using Postman if the _authorization_ header is given the correct value, the string _bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ_, where the second value is the token returned by the _login_ operation.

Using Postman this looks as follows:
![[20e.png]]
### Moving `getTokenFrom` helper function to middleware
It might be cleaner to move this into it's own middleware. The middleware's job will be to take the token from the `Authorization` header and place it to the `token` field of the `request` object.

We do this by registering this middleware in the _app.js_ file before all routes

```js
app.use(middleware.tokenExtractor)
```

routes can access the token with `request.token`:

```js
blogsRouter.post('/', async (request, response) => {
  // ..
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // ..
})
```

Remember that a normal [middleware](https://fullstackopen.com/en/part3/node_js_and_express#middleware) is a function with three parameters, that at the end calls the last parameter _next_ in order to move the control to next middleware:

```js
const tokenExtractor = (request, response, next) => {
  // code that extracts the token

  next()
}
```

## Error Handling
Extend our errorHandler middleware to take into account the different decoding errors.

```js
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformatted id'
    })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message 
    })
  } else if (error.name === 'JsonWebTokenError') {
  	return response.status(401).json({
	  error: 'invalid token'
	})
  }

  logger.error(error.message)

  next(error)
}
```
For testing JWT tokens in Jest refer to [[202102090433 - Jest Test Scenarios#Setup for JWT-based authentication]]

## End Notes
Usernames, passwords and applications using token authentication must always be used over [HTTPS](https://en.wikipedia.org/wiki/HTTPS). We could use a Node [HTTPS](https://nodejs.org/api/https.html) server in our application instead of the [HTTP](https://nodejs.org/docs/latest-v8.x/api/http.html) server (it requires more configuration). On the other hand, the production version of our application is in Heroku, so our application stays secure: Heroku routes all traffic between a browser and the Heroku server over HTTPS.

Footer
---
Source: https://fullstackopen.com/en/part4/token_authentication
Keywords: #programming #node 
Related:
- [[Setting up User Administration in Mongoose and Node]]
- [[Node MOC]]