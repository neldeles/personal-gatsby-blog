---
date:
tags: programming, react, react-router
title:
published:
description:
aliases:
references:
zet_id:
date_modified: 2021-10-25T19:47:34
---

# React Router Library

`react-router` is a React library which provides an excellent solution for managing navigation in a React-application.

> In an [old school web app](https://fullstackopen.com/en/part0/fundamentals_of_web_apps#traditional-web-applications), changing the page shown by the application would be accomplished by the browser making an HTTP GET request to the server and rendering the HTML representing the view that was returned.
>
> In single page apps, we are, in reality, always on the same page. The Javascript code run by the browser creates an illusion of different "pages". If HTTP requests are made when switching view, they are only for fetching JSON formatted data, which the new view might require for it to be shown.

`react-router` helps us navigate between our pages, making sure that:
- when views change, there is a corresponding URL for it i.e. each view has its own address (e.g. to make bookmarking possible)
- browser back button will work normally

## Install the library

```shell
npm install react-router-dom
```

## Simple Sample Application

### `Router` aka BrowserRouter

```js
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"

const App = () => {

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link>
      </div>

      <Switch>
        <Route path="/notes">
          <Notes />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>

      <div>
        <i>Note app, Department of Computer Science 2021</i>
      </div>
    </Router>
  )
}
```
Routing, or the conditional rendering of components _based on the url_ in the browser, is used by placing components as children of the `Router` component, meaning inside `Router`-tags.

Note that `Router` is just the alias we provided for [[202103161433 - BrowserRouter| BrowserRouter]].

### `Link` component

Inside the router we define *links* that modify the address bar with the help of the `Link` component:
```js
<Link to="/notes">notes</Link>
```
The above creates a link in the application with the text _notes_, which when clicked changes the URL in the address bar to _/notes_.

### `Route` component

Components rendered based on the URL of the browser are defined with the help of the component `Route`:
```js
<Route path="/notes">
  <Notes />
</Route>
```
The above defines that if the browser address is */notes* we render the `Notes` component.

#### `Switch` component

We wrap the components to be rendered based on the url with a `Switch`-component:
```js
<Switch>
  <Route path="/notes">
    <Notes />
  </Route>
  <Route path="/users">
    <Users />
  </Route>
  <Route path="/">
    <Home />
  </Route>
</Switch>
```
The switch works by rendering the first component whose _path_ matches the url in the browser's address bar.

Note that the order of the components is important. If we would put the `Home`-component, whose path is _path="/"_, first, nothing else would ever get rendered because the "nonexistent" path "/" is the start of every path.

## Parameterized route

Adding a bit more complexity to our simple sample application, we want to render nested Iinks. Given our `Notes` component, it will have `Note` component children, each of which is clickable and redirects to the individual note. Complete code can be found [here](https://github.com/fullstack-hy/misc/blob/master/router-app-v1.js).
![[3ea.png]]

### `Link` component

The ability to click a name is implemented with the component `Link`, and clicking the name of a note whose id is 3 would trigger an event that changes the address of the browser into _notes/3_:
```js
const Notes = ({notes}) => (
  <div>
    <h2>Notes</h2>
    <ul>
      {notes.map(note =>
        <li key={note.id}>
          <Link to={`/notes/${note.id}`}>{note.content}</Link>
        </li>
      )}
    </ul>
  </div>
)
```

### Define your parametrized url

We define parametrized urls in the routing in `App`-component as follows:
```js
<Router>
  <div>
    <div>
      <Link style={padding} to="/">home</Link>
      <Link style={padding} to="/notes">notes</Link>
      <Link style={padding} to="/users">users</Link>
    </div>

    <Switch>
			// parametrized url
      <Route path="/notes/:id">
        <Note notes={notes} />
      </Route>
      <Route path="/notes">
        <Notes notes={notes} />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>

</Router>
```

We define the route rendering a specific note "express style" by marking the parameter with a colon `:id`:
```js
<Route path="/notes/:id">
```

### `useParams` function

When a browser navigates to the url for a specific note, for example _/notes/3_, we render the `Note` component:
```js
import {
  // ...
  useParams
} from "react-router-dom"

const Note = ({ notes }) => {
  const id = useParams().id
  const note = notes.find(n => n.id === Number(id))
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}
```
The `Note` component receives all of the notes as props `notes`, and it can access the url parameter (the id of the note to be displayed) with the [useParams](https://reacttraining.com/react-router/web/api/Hooks/useparams) function of the react-router.

## useHistory

The option to navigate to the `Login`-view is rendered conditionally in the menu.
```js
<Router>
  <div>
    <Link style={padding} to="/">home</Link>
    <Link style={padding} to="/notes">notes</Link>
    <Link style={padding} to="/users">users</Link>
    {user
      ? <em>{user} logged in</em>
      : <Link style={padding} to="/login">login</Link>
    }
  </div>

  // ...
</Router>
```

So if the user is already logged in, instead of displaying the link *Login*, we show the username of the user:
![[4a.png]]

Our `Login` component:
```js
import {
  // ...
  useHistory
} from 'react-router-dom'

const Login = (props) => {
  const history = useHistory()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('mluukkai')
    history.push('/')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username: <input />
        </div>
        <div>
          password: <input type='password' />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}
```
What is interesting about this component is the use of the [useHistory](https://reacttraining.com/react-router/web/api/Hooks/usehistory) function of the react-router. With this function, the component can access a [history](https://reacttraining.com/react-router/web/api/history) object. The history object can be used to modify the browser's url programmatically.

With user log in, we call the push method of the history object. The `history.push('/')` call causes the browser's url to change to _/_ and the application renders the corresponding component `Home`.

Both [useParams](https://reacttraining.com/react-router/web/api/Hooks/useparams) and [useHistory](https://reacttraining.com/react-router/web/api/Hooks/usehistory) are hook-functions, just like useState and useEffect which we have used many times now.

## redirect

There is one more interesting detail about `Users` route:
```js
<Route path="/users">
  {user ? <Users /> : <Redirect to="/login" />}
</Route>
```
If a user isn't logged in, the `Users` component is not rendered. Instead, the user is _redirected_ using the `Redirect`-component to the login view.

Note that this is just to demonstrate how to redirect. In reality, it would perhaps be better to not even show links in the navigation bar requiring login if the user is not logged into the application.

## Parameterized route revisited

Our application has a flaw. The `Note` component receives all of the notes, even though it only displays the one whose id matches the url parameter:
```js
const Note = ({ notes }) => {
  const id = useParams().id
  const note = notes.find(n => n.id === Number(id))
  // ...
}
```

Would it be possible to modify the application so that `Note` receives only the component it should display?

Old:
```js
const Note = ({ notes }) => {
  const id = useParams().id
  const note = notes.find(n => n.id === Number(id))
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'tärkeä' : ''}</strong></div>
    </div>
  )
}
```

Desired End Goal:
```js
const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}
```

### `useRouteMatch` hook

One way to do this would be to use react-router's [useRouteMatch](https://reacttraining.com/react-router/web/api/Hooks/useroutematch) hook to figure out the id of the note to be displayed in the `App` component.

It is not possible to use [[202103201655 - useRouteMatch hook| useRouteMatch]]-hook in the component which defines the routed part of the application. Let's move the use of the `Router` components from `App`:
```js
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useHistory,
} from "react-router-dom"

const App = () => {
	// ...
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
```

We can then take into use `useRouteMatch` and our `App` component becomes:
```js
import {
  // ...
  useRouteMatch
} from "react-router-dom"

const App = () => {
  // ...

  const match = useRouteMatch('/notes/:id')
  const note = match
    ? notes.find(note => note.id === Number(match.params.id))
    : null

  return (
    <div>
      <div>
        <Link style={padding} to="/">home</Link>
        // ...
      </div>

      <Switch>
        <Route path="/notes/:id">
          <Note note={note} />
        </Route>
        <Route path="/notes">
          <Notes notes={notes} />
        </Route>
         // ...
      </Switch>

      <div>
        <em>Note app, Department of Computer Science 2021</em>
      </div>
    </div>
  )
}
```

Every time the component is rendered, so practically every time the browser's url changes, the following command is executed:

```js
const match = useRouteMatch('/notes/:id')
```

If the url matches _/notes/:id_, ==the match variable will contain an object from which we can access the parametrized part of the path==, the id of the note to be displayed, and we can then fetch the correct note to display.

```js
const note = match
  ? notes.find(note => note.id === Number(match.params.id))
  : null
```

# Footer

---
Source: https://fullstackopen.com/en/part7/react_router
Related:
- [[React MOC]]
- [[202110131613-react-router-with-storybook]]