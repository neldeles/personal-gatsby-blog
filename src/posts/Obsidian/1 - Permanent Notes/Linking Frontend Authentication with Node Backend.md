# Linking Frontend Authentication with Node Backend
## Setting up login form in your frontend
In *App.js*:
```js
  const [notes, setNotes] = useState([]) 
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 

  useEffect(() => {
    noteService
      .getAll().then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  // ...

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
  }

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>

      // ...
    </div>
  )
}

export default App
```
The app state has fields for `username` and `password` to store the data from the form. The form fields have event handlers, which synchronize changes in the field to the state of the _App_ component. The event handlers are simple: An object is given to them as a parameter, and they destructure the field `target` from the object and save its value to the state.

```js
({ target }) => setUsername(target.value)
```

The method `handleLogin`, which is responsible for handling the data in the form, is yet to be implemented.
## Setup your login service
This is in charge of interaction with your REST POST api i.e. logging in is done by sending an HTTP POST request to server address _api/login_. Let's separate the code responsible for this request to its own module, to file _services/login.js_.

We'll use _async/await_ syntax instead of promises for the HTTP request:

```js
import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
```

In your *App.js* component, use the login service in the login event handler:
```js
import loginService from './services/login' 

const App = () => {
  // ...
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // ...
}
```
- if the login is successful: 
	- the form fields are emptied _and_ the server response (including a _token_ and the user details) is saved to the _user_ field of the application's state
- if the login fails:
	- running the function _loginService.login_ results in an error, the user is notified
### Use conditional logic to render components based on login success
The user is not notified about a successful login in any way. Let's modify the application to show the login form only _if the user is not logged-in_ so when `user === null`. 
The form for adding new notes is shown only if the _user is logged-in_, so `user` contains the user details. Also, their name is shown on the screen if they are logged in:
```js
return (
  <div>
    <h1>Notes</h1>

    <Notification message={errorMessage}/>

    {user === null ?
      loginForm() :
	  <div>
	  	<p>{user.name} logged-in</p>
		{noteForm()}
	  </div>
    }

    <h2>Notes</h2>

    // ...

  </div>
)
```
`loginForm()` and `noteForm()` are helper functions that are candidates for separation into their own components. This is what they currently look like in *App.js*:
```js
const App = () => {
  // ...

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>  
  )

  return (
    // ...
  )
}
```
## Creating New Notes
To recap, when there is a successful login, the token is saved to the app's state—in the *user's* field *token* i.e. `user.token`:
```js
const handleLogin = async (event) => {
  event.preventDefault()
  try {
    const user = await loginService.login({
      username, password,
    })

    setUser(user)
    setUsername('')
    setPassword('')
  } catch (exception) {
    // ...
  }
}
```
We now need to attach this token to the Authorization header of the HTTP request. We set this up in the */services/note.js* module:

Before:
```js
import axios from 'axios'

// const baseUrl = 'http://localhost:3001/api/notes'
const baseUrl = '/api/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => {
    console.log(response.data)
    return response.data
  })
}

export default {
  getAll,
  create,
  update
}
```
After:
```js
import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl } /${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken }
```
Once we've set that up, we edit our login event handler to call the `setToken` function. Now whenever we call the `noteService.create()` function, the token is attached to that request.
```js
const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('successful user login');
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
```
## Saving the token to the browser's local storage
Problem: when page is refreshed, login information disappears. 
Solution: Save login details to [[202102221456 - Local Storage in Browser|local storage]].

In the login event handler we make the ff changes:
```js
const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      // ...
    }
  }
```

We still have to modify our application so that when we enter the page, the application checks if user details of a logged-in user can already be found on the local storage. If they can, the details are saved to the state of the application and to _noteService_.

The right way to do this is with an [[202101230525 - React Effect Hooks|effect hook]]: a mechanism we first encountered in [part 2](https://fullstackopen.com/en/part2/getting_data_from_server#effect-hooks), and used to fetch notes from the server.

We can have multiple [[202101230525 - React Effect Hooks|effect hooks]], so let's create a second one to handle the first loading of the page:
```js
const App = () => {
  const [notes, setNotes] = useState([]) 
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null) 

  useEffect(() => {
    noteService
      .getAll().then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  // ...
}
```
The empty array as the parameter of the effect ensures that the effect is executed only when the component is rendered [for the first time](https://reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect).
### Logging out via clearing local storage
It's possible to log out a user using the console. You can log out with the command:

```js
window.localStorage.removeItem('loggedNoteappUser')
```

or with the command which empties `localStorage` completely:

```js
window.localStorage.clear()
```

Footer
---
Source:
Keywords: #programming #react #node 
Related:
- [[Node MOC]]
- [[Node Token Authentication]]