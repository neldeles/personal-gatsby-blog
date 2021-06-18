# Setting up User Administration in Mongoose and Node
The example we are using here is linking *Note* document with *User* document. Id of notes created by the user are stored in the user document.
## Creating Mongoose schema for user
```js
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
```

```js
{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
}
```
The type of the field is _ObjectId_ that references _note_\-style documents. ==Mongo does not inherently know that this is a field that references notes, the syntax is purely related to and defined by Mongoose.==
## Referencing user in the note schema
Let's expand the schema of the note defined in the _model/note.js_ file so that the note contains information about the user who created it:

```js
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5
  },
  date: Date,
  important: Boolean,
  user: {    
  	type: mongoose.Schema.Types.ObjectId,    
	ref: 'User'  
  }
})
```

In stark contrast to the conventions of relational databases, _references are now stored in both documents_: the note references the user who created it, and the user has an array of references to all of the notes created by them.

## Creating users
The password hash is the output of a [one-way hash function](https://en.wikipedia.org/wiki/Cryptographic_hash_function) applied to the user's password. It is never wise to store unencrypted plain text passwords in the database!

Let's install the [bcrypt](https://github.com/kelektiv/node.bcrypt.js) package for generating the password hashes:

```bash
npm install bcrypt
```

### Implementing the route
We create a new user via making an HTTP POST request to the `users` path.

#### Create the controller
Define a separate *router* for dealing with users in *controllers/users.js*:
```js
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter
```
- the password sent in the request is _not_ stored in the database 
	- we store the _hash_ of the password that is generated with the _bcrypt.hash_ function
#### Import controller into app.js
Take the *router* into use in *app.js*:
```js
const usersRouter = require('./controllers/users')

// ...

app.use('/api/users', usersRouter)
```
#### Create the automated test
We are essentially practicing [test-driven development (TDD)](https://en.wikipedia.org/wiki/Test-driven_development), where tests for new functionality are written before the functionality is implemented.

In *test_helper.js* implement the `usersInDb()` helper function:
```js
const User = require('../models/user')

// ...

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb,
}
```

Create a *tests/users_api.test.js* file and implement the initial test:
```js
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user.js')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'neldeles',
      name: 'noel deles',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
```
##### Creating tests for passwords
Do not test password restrictions with Mongoose validations. It is not a good idea because the password received by the backend and the password hash saved to the database are not the same thing. The password length should be validated in the controller like we did in [part 3](https://fullstackopen.com/en/part3/validation_and_es_lint) before using Mongoose validation.

Example:
```js
app.post('/api/notes', (request, response) => {
  const body = request.body
  if (body.content === undefined) {    return response.status(400).json({ error: 'content missing' })  }
  // ...
})
```
## Creating a new note
The code for creating a new note has to be updated so that the note is assigned to the user who created it.

Let's expand our current implementation so, that the information about the user who created a note is sent in the `userId` field of the request body:

```js
const User = require('../models/user')
//...

notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const user = await User.findById(body.userId)
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
It's worth noting that the _user_ object also changes. The _id_ of the note is stored in the _notes_ field:

```js
const user = await User.findById(body.userId)

// ...

user.notes = user.notes.concat(savedNote._id)
await user.save()
```
Let's try to create a new note
![[10e.png]]

The operation appears to work. Let's add one more note and then visit the route for fetching all users:
![[11e.png]]

We can see that the user has two notes.

Likewise, the ids of the users who created the notes can be seen when we visit the route for fetching all notes:
![[12e.png]]

## Populate Method
We do a [[202102151521 - The Mongoose Join|Mongoose join]] using the `populate` method. Update the route wherein you'd like the join to occur. In our case, it's the GET route in *controllers/users*:
```js
usersRouter.get('/', async (request, response) => {
  const users = await User    .find({}).populate('notes')
  response.json(users)
})
```

The [populate](http://mongoosejs.com/docs/populate.html) method is chained after the _find_ method making the initial query. The parameter given to the populate method defines that the _ids_ referencing _note_ objects in the _notes_ field of the _user_ document will be replaced by the referenced _note_ documents.

The result is almost exactly what we wanted:
![[13ea.png]]

We can use the populate parameter for choosing the fields we want to include from the documents. The selection of fields is done with the Mongo [syntax](https://docs.mongodb.com/manual/tutorial/project-fields-from-query-results/#return-the-specified-fields-and-the-id-field-only):

```js
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('notes', { content: 1, date: 1 })

  response.json(users)
});
```

The result is now exactly like we want it to be:
![[14ea 1.png]]

Next step is to set up [[Node Token Authentication| user authentication via tokens]]

Footer
---
Source: https://fullstackopen.com/en/part4/user_administration#mongoose-schema-for-users
Keywords: #programming #mongoose #node 
Related:
- [[Node MOC]]
- [[Node Token Authentication]]