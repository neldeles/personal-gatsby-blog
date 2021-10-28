# Testing the Backend
We will now start writing tests for the backend. Since the backend does not contain any complicated logic, it doesn't make sense to write [unit tests](https://en.wikipedia.org/wiki/Unit_testing) for it. The only potential thing we could unit test is the _toJSON_ method that is used for formatting notes.

In some situations, it can be beneficial to implement some of the backend tests by mocking the database instead of using a real database. One library that could be used for this is [mongo-mock](https://github.com/williamkapke/mongo-mock).

Since our application's backend is still relatively simple, we will make the decision to test the entire application through its REST API, so that the database is also included. This kind of testing where multiple components of the system are being tested as a group, is called [integration testing](https://en.wikipedia.org/wiki/Integration_testing).

## Test environment
The convention in Node is to define the execution mode of the application with the `NODE_ENV` environment variable. 
### Initial Setup
So go to your *package.json* file and define separate modes for development, production, and testing: 
```json
{
  // ...
  "scripts": {
    "start": "NODE_ENV=production node index.js",
	"dev": "NODE_ENV=development nodemon index.js", 
	// ...
    "test": "NODE_ENV=test jest --verbose --runInBand"
  },
  // ...
}
```
Note for our test script we add in the [runInBand](https://jestjs.io/docs/en/cli.html#--runinband) option. This option will prevent Jest from running tests in parallel; its significant once our tests start using the database.
### Modifying the different modes
For each *NODE_ENV* mode we can then modify the way the app runs i.e. defining the application to use a separate test database.

> The ideal way to set that up is to have every test execution use its own separate database. This is "relatively simple" to achieve by [running Mongo in-memory](https://docs.mongodb.com/manual/core/inmemory/) or by using [Docker](https://www.docker.com/) containers.

You make the changes locally in your *utils/config.js* (or module that defines the app's configuration):
```js
const PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
	MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  PORT
}
```

The _.env_ file has _separate variables_ for the database addresses of the development and test databases:

```bash
MONGODB_URI=mongodb+srv://fullstack:secred@cluster0-ostce.mongodb.net/note-app?retryWrites=true
PORT=3001

TEST_MONGODB_URI=mongodb+srv://fullstack:secret@cluster0-ostce.mongodb.net/note-app-test?retryWrites=true
```

##### Windows compatibility
There is a slight issue in the way that we have specified the mode of the application in our scripts: it will not work on Windows. We can correct this by installing the [cross-env](https://www.npmjs.com/package/cross-env) package as a development dependency with the command:

```bash
npm install --save-dev cross-env
```

We can then achieve cross-platform compatibility by using the cross-env library in our npm scripts defined in _package.json_:

```json
{
  // ...
  "scripts": {
    "start": "cross-env NODE_ENV=production node index.js",
    "dev": "cross-env NODE_ENV=development nodemon index.js",
    // ...
    "test": "cross-env NODE_ENV=test jest --verbose --runInBand",
  },
  // ...
}
```
## supertest
Install the *supertest* package as a dev dependency. This helps when writing tests for testing the API:
```bash
npm install --save-dev supertest
```
## First Test
```js
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const response = await api.get('/api/notes')

  expect(response.body).toHaveLength(2)
})

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes')

  expect(response.body[0].content).toBe('HTML is easy')
})

// function in jest to close db connection
afterAll(() => {
  mongoose.connection.close()
})
```
- more info on [[async-and-await-in-javascript]]
	- we use async/await for our API tests because ==making a request to the API is an *asynchronous* operation==
### Edit logger middleware
If you're using any middleware loggers, make sure to exclude them in test environment because they will obstruct the test execution output:
```js
const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
  	console.log(...params)  
  }
}

const error = (...params) => {
  console.error(...params)
}

module.exports = {
  info, error
}
```
### Possible jest console warning when running test
When running your tests you may run across the following console warning:

![fullstack content](https://fullstackopen.com/static/7532c5c3fb1d0e3adfdb44969c26ab14/5a190/8.png)

If this occurs, let's follow the [instructions](https://mongoosejs.com/docs/jest.html) and add a _jest.config.js_ file at the root of the project with the following content:

```js
module.exports = {
  testEnvironment: 'node'
}
```
## Initializing the database before tests
Testing appears to be easy and our tests are currently passing. ==However, our tests are bad as they are dependent on the state of the database (that happens to be correct in my test database).== In order to make our tests more robust, we have to reset the database and generate the needed test data in a controlled manner before we run the tests.

Jest offers many other [functions](https://facebook.github.io/jest/docs/en/setup-teardown.html#content) that can be used for executing operations once before any test is run, or every time before a test is run.

Let's initialize the database _before every test_ with the [beforeEach](https://jestjs.io/docs/en/api.html#beforeeachfn-timeout) function:

```js
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Note = require('../models/note')
const initialNotes = [
  {
    content: 'HTML is easy',
    date: new Date(),
    important: false,
  },
  {
    content: 'Browser can execute only Javascript',
    date: new Date(),
    important: true,
  },
]
beforeEach(async () => {
  await Note.deleteMany({})
  let noteObject = new Note(initialNotes[0])
  await noteObject.save()
  noteObject = new Note(initialNotes[1])
  await noteObject.save()
})
// ...
```
We can then modify our first test so that it no longer uses hard-coded values for the test, but instead checks the initialized db values:
```js
test('all notes are returned', async () => {
  const response = await api.get('/api/notes')

  expect(response.body).toHaveLength(initialNotes.length)})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(r => r.content)  expect(contents).toContain(    'Browser can execute only Javascript'  )})
```
## More tests and refactoring the backend
### Creating helper functions
In the same directory as our test file, it's a good idea to create a *tests/test_helper.js* file for steps we repeat across our tests:
```js
const Note = require('../models/note')

const initialNotes = [
  {
    content: 'HTML is easy',
    date: new Date(),
    important: false
  },
  {
    content: 'Browser can execute only Javascript',
    date: new Date(),
    important: true
  }
]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon', date: new Date() })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

module.exports = {
  initialNotes, nonExistingId, notesInDb
}
```
- `notesInDb` function can be used for checking the notes stored in the database
- `nonExistingId` function can be used for creating a database object ID that does not belong to any note object in the database

Can then refactor the test to use these helper modules:
```js
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Note = require('../models/note')

beforeEach(async () => {
  await Note.deleteMany({})

  let noteObject = new Note(helper.initialNotes[0])
  await noteObject.save()

  noteObject = new Note(helper.initialNotes[1])
  await noteObject.save()
})

test('a valid note can be added ', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const notesAtEnd = await helper.notesInDb()
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)

  const contents = notesAtEnd.map(n => n.content)
  expect(contents).toContain(
    'async/await simplifies making async calls'
  )
})

test('note without content is not added', async () => {
  const newNote = {
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  const notesAtEnd = await helper.notesInDb()

  expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
})

afterAll(() => {
  mongoose.connection.close()
```
### Optimizing the beforeEach function
Saving multiple entries into the database is akin to having multiple *promises*. What we want is bundling these multiple promises into a single promise, such that ==this single promise is fulfilled once every promise in the array passed to it as a parameter is resolved.== 

We can do this with the [[202102110310 - JavaScript Promise.all() method|Promise.all]] method.
```js
beforeEach(async () => {
  await Note.deleteMany({})

  const noteObjects = helper.initialNotes
    .map(note => new Note(note))
  const promiseArray = noteObjects.map(note => note.save())
  await Promise.all(promiseArray)
})
```
- `noteObjects` variable is assigned to an array of Mongoose objects that are created with the `Note `constructor for each of the notes in the `helper.initialNotes` array
- next line of code creates a new array that _consists of promises_, that are created by calling the _save_ method of each item in the _noteObjects_ array
	- it is an array of promises for saving each of the items to the database
### Sample tests for get and delete of individual object
```js
test('a specific note can be viewed', async () => {
  const notesAtStart = await helper.notesInDb()

  const noteToView = notesAtStart[0]

  const resultNote = 
  	await api
		.get(`/api/notes/${noteToView.id}`)
  		.expect(200)    
		.expect('Content-Type', /application\/json/)
  const processedNoteToView = JSON.parse(JSON.stringify(noteToView))
  expect(resultNote.body).toEqual(processedNoteToView)
})

test('a note can be deleted', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToDelete = notesAtStart[0]

  await api
  	.delete(`/api/notes/${noteToDelete.id}`)
	.expect(204)	
  
  const notesAtEnd = await helper.notesInDb()

  expect(notesAtEnd).toHaveLength(
    helper.initialNotes.length - 1
  )

  const contents = notesAtEnd.map(r => r.content)
  expect(contents).not.toContain(noteToDelete.content)
})
```

In the first test, the note object we receive as the response body goes through JSON serialization and parsing. This processing will turn the note object's _date_ property value's type from _Date_ object into a string. Because of this we can't directly compare equality of the _resultNote.body_ and _noteToView_. Instead, we must first perform similar JSON serialization and parsing for the _noteToView_ as the server is performing for the note object.
### Refactoring the tests
Below is an example of a refactored test that is grouped using `describe` blocks and expaned with scenraios of invalid ID's or nonExisting objects:
```js
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Note = require('../models/note')

beforeEach(async () => {
  await Note.deleteMany({})

  const noteObjects = helper.initialNotes
    .map(note => new Note(note))
  const promiseArray = noteObjects.map(note => note.save())
  await Promise.all(promiseArray)
})

describe('when there is initially some notes saved', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(helper.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(r => r.content)

    expect(contents).toContain(
      'Browser can execute only Javascript'
    )
  })
})

describe('viewing a specific note', () => {
  test('succeeds with a valid id', async () => {
    const notesAtStart = await helper.notesInDb()

    const noteToView = notesAtStart[0]

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      
    const processedNoteToView = JSON.parse(JSON.stringify(noteToView))

    expect(resultNote.body).toEqual(processedNoteToView)
  })

  test('fails with statuscode 404 if note does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    console.log(validNonexistingId)

    await api
      .get(`/api/notes/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/notes/${invalidId}`)
      .expect(400)
  })
})

describe('addition of a new note', () => {
  test('succeeds with valid data', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(200)
      .expect('Content-Type', /application\/json/)


    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)

    const contents = notesAtEnd.map(n => n.content)
    expect(contents).toContain(
      'async/await simplifies making async calls'
    )
  })

  test('fails with status code 400 if data invaild', async () => {
    const newNote = {
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)

    const notesAtEnd = await helper.notesInDb()

    expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
  })
})

describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToDelete = notesAtStart[0]

    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204)

    const notesAtEnd = await helper.notesInDb()

    expect(notesAtEnd).toHaveLength(
      helper.initialNotes.length - 1
    )

    const contents = notesAtEnd.map(r => r.content)

    expect(contents).not.toContain(noteToDelete.content)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
```

Footer
---
Source:
Keywords: #programming #testing #javascript #jest 
Related:
- [[Node MOC]]
- [[async-and-await-in-javascript]]
- [[Testing Node applications - 0 - Introduction]]
- [[202102090433 - Jest Test Scenarios]]