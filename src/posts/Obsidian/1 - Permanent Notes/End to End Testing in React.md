# End to End Testing in React
## What is End to End Testing
![[202103032004 - End to End Testing#^88711d]]

## Cypress Library
The E2E library we will be using is the [[202103032043 - Cypress Library|Cypress]] library. Unlike the frontend's unit tests, Cypress tests can be in the frontend or the backend repository, or even in their own separate repository. In our case here, we install it in our frontend.

### Frontend setup
Install Cypress to the **frontend** as development dependency:
```shell
npm install --save-dev cypress
```

In your *package.json* file add an npm-script to run the graphical test runner:
```shell
{
  // ...
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "server": "json-server -p3001 db.json",
    "cypress:open": "cypress open"
  },
  // ...
}
```

If you want to run Cypress from the command Iine, add the ff npm-script:
```shell
{
  // ...
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "server": "json-server -p3001 db.json",
    "cypress:open": "cypress open",
		"test:e2e": "cypress run"
  },
  // ...
}
```

In your *.gitignore* add the ff:
```js
cypress/videos
```
This ignores the videos of the test execution that are saved when we run cypress from the command line.

### Backend setup
**In your backend**, add an npm-script which starts Cypress in test mode, or so that `NODE_ENV` is test:
```js
{
  // ...
  "scripts": {
    "start": "cross-env NODE_ENV=production node index.js",
    "dev": "cross-env NODE_ENV=development nodemon index.js",
    "build:ui": "rm -rf build && cd ../../../2/luento/notes && npm run build && cp -r build ../../../3/luento/notes-backend",
    "deploy": "git push heroku master",
    "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && git push && npm run deploy",
    "logs:prod": "heroku logs --tail",
    "lint": "eslint .",
    "test": "cross-env NODE_ENV=test jest --verbose --runInBand",
    "start:test": "cross-env NODE_ENV=test node index.js"
  },
  // ...
}
```

### Fixing `cy` is not defined ESlint error
If you have eslint setup, it will flag the error: `cy is not defined eslint(no-undef)`. We can get rid of this by installing *eslint-plugin-cypress* as a development dependency:
```shell
npm install eslint-plugin-cypress --save-dev
```
After installing, change the configuration in *.eslintrc.js* like so:
```js
module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest/globals": true,
        "cypress/globals": true
    },
    "extends": [ 
      // ...
    ],
    "parserOptions": {
      // ...
    },
    "plugins": [
        "react", "jest", "cypress"
    ],
    "rules": {
      // ...
    }
}
```


## Running Cypress
The tests require the tested system to be running. Unlike our backend integration tests, Cypress tests _do not start_ the system when they are run. 

So in your frontend start the system:
```shell
npm run start
```

In your backend start the system:
```shell
npm run start:test
```

You can then start Cypress with the command:
```shell
npm run cypress:open
```

When we first run Cypress, it creates a _cypress_ directory. It contains an _integration_ subdirectory, where we will place our tests. Cypress creates a bunch of example tests for us in the _integration/examples_ directory. We can delete the _examples_ directory and make our own test in file _note\_app.spec.js_:

```js
describe('Note app', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2020')
  })
})
```

We start the test from the opened window:
![[40ea.png]]

Running the test opens your browser and shows how the application behaves as the test is run:
![[32ae.png]]
### Basic structure of a Cypress test
- similar to Jest, uses `describe` blocks to group different test cases
- test cases are defined with the `it` method (borrowed from Mocha testing library it uses under the hood)
- some Cypress commands used:
	- `cy.visit`: opens the web address (given to it as a parameter) in the browser used by the test
	- `cy.contains`: searches for the string it received as a parameter
		- if it does not find the text, the test does not pass
- ==IMPORTANT: it is [recommended](https://mochajs.org/#arrow-functions)that arrow functions not be used== because they might cause some issues in certain situations
### Order execution of Cypress tests
Cypress runs the tests in the order they are in the code. For example given the ff:
```js
describe('Note app', function() {
  // ...

  it('user can log in', function() {
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('Matti Luukkainen logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('a new note can be created', function() {
	  cy.contains('new note').click()
      cy.get('#note-text-field').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })
  })
})
```
1. Runs `user can log in`
2. Cypress will run `when logged in`—first the `beforeEach` then `a new note can be created`
We need to log in step 2 again because **each** test starts from scratch. All changes to the browser's state are reversed after each test.

### Running test once only
When developing a new test or when debugging a broken test, we can define the test with `it.only` instead of `it`, so that Cypress will only run the required test. When the test is working, we can remove `.only`.

For example:
```js
describe('Note app', function() {
  // ...

  it.only('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.contains('wrong credentials')
  })

  // ...
)}
```

## Test for writing to a login form
Let's extend our tests so, that the test tries to log in to our application. We assume our backend contains a user with the username _testuser_ and password _test123_.

Since opening the page *http://localhost:3000* is common across our tests, let's refactor it into a `beforeEach` block:
```js
describe('Note app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2020')
  })
})
```

The test begins by opening the login form:
```js
describe('Note app',  function() {
  // ...

  it('login form can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('login').click()
  })
})
```
We click the button using command `cy.click()`.

This opens our login form. Our login form contains two `input` fields the test should write into:
```js
describe('Note app', function() {
	// ...
	
  it('login form can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('login').click()
  })
  
  it('user can login', function() {
  	cy.contains('login').click()
	cy.get('input:first').type('testuser')
	cy.get('input:last').type('test123')
  })
	
})
```
The `cy.get()` command allows for searching elements by CSS selectors.

### Refactor component to use `id`
We should not use order of element as the CSS selector because it's fragile i.e. if we add more input fields later on the test will break.

In our case here, go to the *LoginForm.js* component and give our inputs unique `ids`, then use that as the CSS selector:
```js
describe('Note app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2020')
  })

  it('login form can be opened', function () {
    cy.contains('login').click()
  })

  it('user can login', function () {
    cy.contains('login').click()
    cy.get('#username').type('testuser')
    cy.get('#password').type('test123')
    cy.get('#login-button').click()

    cy.contains('Mister Test logged-in')
  })
})
```

#### Note on `cy.contains`
If we search for a button by its text, [cy.contains](https://docs.cypress.io/api/commands/contains.html#Syntax) will return the first of them, or the one opening the login form. This will happen even if the button is not visible. To avoid name conflicts, we gave submit button the id `login-button` we can use to access it.

## Testing new note form (our note component)
```js
describe('Note app', function() {
  // ..
  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('#note-text-field').type('a note created by cypress')
      cy.contains('save').click()
	  cy.contains('show all').click()
      cy.contains('a note created by cypress')
    })
  })
})
```
The test has been defined in its own `describe` block. Only logged in users can create new notes, so we added logging in to the application to a `beforeEach` block.

## Controlling the state of the database
If the tests need to be able to modify the server's database, the situation immediately becomes more complicated. Ideally, the server's database should be the same each time we run the tests, so our tests can be reliably and easily repeatable.

As with unit and integration tests, with E2E tests it is the best to empty the database and possibly format it before the tests are run. The challenge with E2E tests is that they do not have access to the database.

The solution is to create API endpoints to the backend for the test. We can empty the database using these endpoints.

### Creating API endpoints for our test
Let's create a new `router` for the tests. **In your backend project**, create */controllers/testing.js*:
```js
const router = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Note.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router
```
In your *App.js* file in the backend project, we will add the `router` ==only if the application is run on test-mode==:
```js
// ...

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/notes', notesRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
```
After implementing the above, a HTTP POST request to the */api/testing/reset* endpoint empties the database.

### Calling our endpoint in the frontend
Next we will change the `beforeEach` block so that it empties the server's database before tests are run.

Currently it is not possible to add new users through the frontend's UI, so we add a new user to the backend from the beforeEach block.

```js
describe('Note app', function() {
   beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
  })
  
  it('front page can be opened', function() {
    // ...
  })

  it('user can login', function() {
    // ...
  })

  describe('when logged in', function() {
    // ...
  })
})
```
During the formatting the test does HTTP requests to the backend with [cy.request](https://docs.cypress.io/api/commands/request.html).

Unlike earlier, now the testing starts with the backend in the same state every time. The backend will contain one user and no notes.

## Test for toggling importance of notes
There are multiple ways to test this. Our approach here is to check the change in the text value of the button i.e. `make important` => `make not important`.
```js
describe('Note app', function() {
  // ...

  describe('when logged in', function() {
    // ...

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.contains('new note').click()
        cy.get('input').type('another note cypress')
        cy.contains('save').click()
      })

      it('it can be made important', function () {
	  	cy.contains('show all').click()
        cy.contains('another note cypress')
          .contains('make important')
          .click()

        cy.contains('another note cypress')
          .contains('make not important')
      })
    })
  })
})
```
The first command searches for a component containing the text `another note cypress`, and then for a `make important` button within it. It then clicks the button.

The second command checks that the text on the button has changed to `make not important`.

### Advanced implementation
The above works because `make important` is contained within the text `another note cypress`. 

![[202103051241 - Cypress `.contains`#^69fcb5]]

However, what if our component wasn't structured this way? For example:
```js
const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li className='note'>
      <span>{note.content}</span>
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}
```

In the above scenario, we wrapped `note.content` in a `span` so the button is no longer nested within so our chained `contains` will break. 

Before we show the fix important to note we've refactored our setup so 3 notes are created instead of one:
```js
describe('when logged in', function() {
  describe('and several notes exist', function () {
    beforeEach(function () {
      cy.createNote({ content: 'first note', important: false })
      cy.createNote({ content: 'second note', important: false })
      cy.createNote({ content: 'third note', important: false })
    })

    it('one of those can be made important', function () {
      cy.contains('second note')
        .contains('make important')
        .click()

      cy.contains('second note')
        .contains('make not important')
    })
  })
})
```

Moving on to the fix, one approach is the following:
```js
it('other of those can be made important', function () {
  cy.contains('second note').parent().find('button').click()
  cy.contains('second note').parent().find('button')
    .should('contain', 'make not important')
})
```

In the first line, we use the [parent](https://docs.cypress.io/api/commands/parent.html) command to access the parent element of the element containing _second note_ and find the button from within it. Then we click the button, and check that the text on it changes.

Note that we use the command [find](https://docs.cypress.io/api/commands/find.html#Syntax) to search for the button. We cannot use [cy.get](https://docs.cypress.io/api/commands/get.html) here, because it always searches from the _whole_ page and would return all 5 buttons on the page.

#### Using Cypress alias
Unfortunately, we have some copypaste in the tests now, because the code for searching for the right button is always the same.

In these kinds of situations, it is possible to use the [as](https://docs.cypress.io/api/commands/as.html) command:
```js
it.only('other of those can be made important', function () {
  cy.contains('second note').parent().find('button').as('theButton')
  cy.get('@theButton').click()
  cy.get('@theButton').should('contain', 'make not important')
})
```
Now the first line finds the right button, and uses `as` to save it as `theButton`. The followings lines can use the named element with `cy.get('@theButton')`.

## Test for failed login
`contains` is pretty one-dimensional in that it works based on text content only. For more advanced assertion patterns i.e. using `should` refer to [[202103041954 - Cypress `should` and `and` syntax|this]].
```js
describe('Note app', function() {
  // ...

  it.only('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
	  
	cy.get('html').should('not.contain', 'Mister Test logged-in')
  })

  // ...
)}
```

We can see that we also check the absence of a successful login in the line `cy.get('html').should('not.contain', 'Mister Test logged-in')`. We used `cy.get('html')` to access the whole visible content of the application.

## Refactoring our Cypress test to bypass the UI
Currently we have the following tests:

```js
describe('Note app', function() {
  it('user can login', function() {
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('Matti Luukkainen logged in')
  })

  it.only('login fails with wrong password', function() {
    // ...
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.get('#login-button').click()
    })

    it('a new note can be created', function() {
      // ... 
    })
   
  })
})
```

First we test logging in. Then, in their own describe block, we have a bunch of tests which expect the user to be logged in. User is logged in in the `beforeEach` block.

The Cypress documentation gives us the following advice: [Fully test the login flow – but only once!](https://docs.cypress.io/guides/getting-started/testing-your-app.html#Logging-in). So instead of logging in a user using the form in the _beforeEach_ block, Cypress recommends that we [bypass the UI](https://docs.cypress.io/guides/getting-started/testing-your-app.html#Bypassing-your-UI) and do a HTTP request to the backend to log in. The reason for this is that logging in with a HTTP request is much faster than filling a form.

### Using local storage with Cypress
Our situation is a bit more complicated than in the example in the Cypress documentation, because when a user logs in, our application saves their details to the localStorage. However Cypress can handle that as well. The code is the following

```js
describe('when logged in', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/login', {
      username: 'mluukkai', password: 'salainen'
    }).then(response => {
      localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
      cy.visit('http://localhost:3000')
    })
  })

  it('a new note can be created', function() {
    // ...
  })

  // ...
})
```

We can access the response to a [cy.request](https://docs.cypress.io/api/commands/request.html) with the `then` method. Under the hood `cy.request`, like all Cypress commands, are [promises](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Commands-Are-Promises). The callback function saves the details of a logged in user to localStorage, and reloads the page. Now there is no difference to user logging in with the login form.

#### Custom command
Custom commands are declared in _cypress/support/commands.js_. The code for logging in is as follows:

```js
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedNoteappUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})
```

Using our custom command is easy, and our test becomes cleaner:

```js
describe('when logged in', function() {
  beforeEach(function() {
    cy.login({ username: 'testuser', password: 'test123' })
	})

  it('a new note can be created', function() {
    // ...
  })

  // ...
})
```

##### Creating a custom command for creating a note
The same applies to creating a new note now that we think about it. We have a test which makes a new note using the form. We also make a new note in the `beforeEach` block of the test testing changing the importance of a note:

```js
describe('Note app', function() {
  // ...

  describe('when logged in', function() {
    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()

      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.contains('new note').click()
        cy.get('input').type('another note cypress')
        cy.contains('save').click()
      })

      it('it can be made important', function () {
        // ...
      })
    })
  })
})
```

Let's make a new custom command for making a new note. The command will make a new note with a HTTP POST request:

```js
Cypress.Commands.add('createNote', ({ content, important }) => {
  cy.request({
    url: 'http://localhost:3001/api/notes',
    method: 'POST',
    body: { content, important },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedNoteappUser')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})
```

The command expects user to be logged in and the user's details to be saved to localStorage.

Now the formatting block becomes:

```js
describe('Note app', function() {
  // ...

  describe('when logged in', function() {
    it('a new note can be created', function() {
      // ...
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({
          content: 'another note cypress',
          important: false
        })
      })

      it('it can be made important', function () {
        // ...
      })
    })
  })
})
})
```

## Debugging Tests
The form of the Cypress tests gives the impression that the tests are normal JavaScript code, and we could for example try this:

```js
const button = cy.contains('login')
button.click()
debugger() 
cy.contains('logout').click()
```

This won't work however. When Cypress runs a test, it adds each `cy` command to an execution queue. When the code of the test method has been executed, Cypress will execute each command in the queue one by one.

Cypress commands always return `undefined`, so `button.click()` in the above code would cause an error. An attempt to start the debugger would not stop the code between executing the commands, but before any commands have been executed.

Cypress commands are _like promises_, so if we want to access their return values, we have to do it using the [then](https://docs.cypress.io/api/commands/then.html) command. For example, the following test would print the number of buttons in the application, and click the first button:

```js
it('then example', function() {
  cy.get('button').then( buttons => {
    console.log('number of buttons', buttons.length)
    cy.wrap(buttons[0]).click()
  })
})
```

Stopping the test execution with the debugger is [possible](https://docs.cypress.io/api/commands/debug.html). The debugger starts only if Cypress test runner's developer console is open.

Footer
---
Source: https://fullstackopen.com/en/part5/end_to_end_testing
Keywords: #programming #react #testing #cypress
Related:
- [[React MOC]]