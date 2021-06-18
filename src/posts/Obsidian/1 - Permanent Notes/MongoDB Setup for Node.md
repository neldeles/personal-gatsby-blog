# MongodDB Setup for Node
1. [[MongoDB Setup for Node#Install mongoose|Install `mongoose`]]
2. [[MongoDB Setup for Node#Create Mongo test file|Create a `mongo.js` test file]]
3. [[MongoDB Setup for Node#Test fetch data from database|Fetch newly saved data in the database]]
4. [[MongoDB Setup for Node#Connect backend to the database|Connect backend to the database]]
5. [[MongoDB Setup for Node#Update route handlers to use the database|Update route handlers to use the database]]
6. [[MongoDB Setup for Node#Verify frontend and backend integration|Verify frontend and backend integration]]
7. [[MongoDB Setup for Node#Set up error handling for your promises via middleware|Set up error handling for your promises via middleware]]
8. [[MongoDB Setup for Node#Deploy database backend to production|Deploy database backend to production]]
---
## Install mongoose
Once you've setup the frontend and backend, the next step is to save the data in a database. The backend will then read and write data from the database.

The [official MongoDb Node.js driver](https://mongodb.github.io/node-mongodb-native/) library is quite cumbersome to use. We will instead use the [Mongoose](http://mongoosejs.com/index.html) library that offers a higher level API.
```bash
npm install mongoose
```
## Create Mongo test file
```js
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

// def'n of schema
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

// def'n of model
const Note = mongoose.model('Note', noteSchema)

// creation of new object
const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
```
Using this test file, you can then check if your config is working with your database provider. You can run it via:
```bash
node mongo.js password
```

Important steps to take note of in the test file are:
- establish the connection
- [[202102010717 - Mongoose Ideology on Defining Schema | define the schema]]
- definition of model
	- Mongoose convention is to name the collection as the plural when the schema refers to them in the singular i.e. `notes` and `Note`
- creation of a new object using the `Note` model (which is a [[202012230503 - JavaScript Constructor Function|constructor function]])
## Test fetch data from database
```js
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
```
Replace the save method call with this to fetch data from your db.
## Connect backend to the database
Create a new module for the Mongoose specific code. Create directory called *models* and a file called *note.js*:
```js
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log('connecting to', url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {    console.log('connected to MongoDB')  })  .catch((error) => {    console.log('error connecting to MongoDB:', error.message)  })
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)
```
Important step is modifying the[[202102010731 - `toJSON` method of Mongoose schema| `toJSON` method]] of the schema. This is because we need to conver the `_id` object to string, and we want to exclude the `__v` property.

Next is to import the module in the `index.js` file:
```js
const Note = require('./models/note')
```
Next is setting up our environment variable with the help of the `dotenv` library.
```bash
npm install dotenv
```
Add *.env* to your *.gitignore* file then create *.env* file at root of project:
```bash
MONGODB_URI='mongodb+srv://fullstack:sekred@cluster0-ostce.mongodb.net/note-app?retryWrites=true'
PORT=3001
```
The environment variables defined in the _.env_ file can be taken into use with the expression `require('dotenv').config()`. Add it to the top of *index.js*:
```js
require('dotenv').config()
const express = require('express')

//...
```
Update the `PORT` var to reference your environment variables: 
```js
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
```
## Update route handlers to use the database
### Update post request
```js
app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }
  // use Note constructor
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })
  // use save method
  note.save().then(savedNote => {
    response.json(savedNote)
  })
})
```
### Update individual get request
```js
app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})
```
### Update fetch all get request
```js
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})
```
### Update delete request
```js
app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})
```
### Update put request
```js
app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})
```
- unlike the `post` request which recieved an object created with the model constructor, `findByIdAndUpdate` receives a regular JS object
- add in the optional parameter `{new: true}` because by default `findByIdAndUpdate` returns orignal document and not the modified/updated doc
## Verify frontend and backend integration
- test the backend with Postman
- test the frontend together with the backend
## Set up error handling for your promises via middleware
> When dealing with Promises, it's almost always a good idea to add error and exception handling, because otherwise you will find yourself dealing with strange bugs.
### Setup an unknown endpoint middleware error handler
```js
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)
```
- make sure to keep in mind that [[202102020452 - Order of Middleware Loading in Node|order for middleware]] matters

### Sample error handler for `get`
```js
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id).then(note => {
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => {
      next(error)
    })
})
```
- the `if` clause inside the `then` clause is for handling errors wherein the `id` can't be found
- the error is passed to the `next` function and execution continues to the *Express error handler middleware*
```js
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)
```
> The error handler checks if the error is a _CastError_ exception, in which case we know that the error was caused by an invalid object id for Mongo. In this situation the error handler will send a response to the browser with the response object passed as a parameter. In all other error situations, the middleware passes the error forward to the default Express error handler.
## Set up your schema's validation
We can use *Mongoose's* validation functionality. Go to your *model* file then edit the schema by defining the specific validation rules for each field:
```js
const noteSchema = new mongoose.Schema({
  content: {    
  	type: String,    
	minlength: 5,    
	required: true  
  },  
  date: {     
  	type: Date,    
	required: true  
  },
  important: Boolean
})
```

Make sure to edit the handler's that use this schema so any potential exception is passed to the error handler middleware. We also need to expand the error handler to deal with these validation errors:
```js
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError'){
  	return response.status(400).json({ error: error.message })  
  }

  next(error)
}
```
### Mongoose Unique Validator
If you need validation for unique fields i.e. username, can use the [*mongoose-unique-validator*](https://github.com/blakehaswell/mongoose-unique-validator#readme) library. 

## Deploy database backend to production
The environment variable that defines the database URL in production should be set to Heroku with the _heroku config:set_ command:
```bash
$ heroku config:set MONGODB_URI=mongodb+srv://fullstack:secretpasswordhere@cluster0-ostce.mongodb.net/note-app?retryWrites=true
```
**NB:** if the command causes an error, give the value of MONGODB_URI in apostrophes:
```bash
$ heroku config:set MONGODB_URI='mongodb+srv://fullstack:secretpasswordhere@cluster0-ostce.mongodb.net/note-app?retryWrites=true'
```
From your backend, use the `deploy:full` script we made in the [[Deploying Node App to Internet using Heroku#Streamlining configuratio streamlining step]] of *package.json* file. 


Footer
---
Source:
Keywords: #programming #mongodb #nosql #node #heroku 
Related:
- [[Node MOC]]
- [[Deploying Node App to Internet using Heroku]]