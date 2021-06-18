---
aliases:
- 'react ui'
- 'react UI'
- 'React UI'
tags: ['programming', 'react']
references:
- 'https://fullstackopen.com/en/part7/more_about_styles'
---

# React UI Frameworks
## React Bootstrap
### Install package
```js
npm install react-bootstrap
```

### Add the CSS link
Add the Iink for loading the CSS styesheet inside of `head` tag in *public/index.html*:
```html
<head>
  <link
    rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
    crossorigin="anonymous"
  />
  // ...
</head>
```

### Render contents of application within a container 
You do this in bootstrap via the `container` class:
```js
const App = () => {
	//...
	return (
		<div className='container'>
			// ...
		</div>
	)
}
```

### Add table
We can use `react-bootstap`'s `Table` component:
```js
import { Table } from 'react-bootstrap'

const Notes = ({ notes }) => (
  <div>
    <h2>Notes</h2>
    <Table striped>
      <tbody>
        {notes.map(note =>
          <tr key={note.id}>
            <td>
              <Link to={`/notes/${note.id}`}>
                {note.content}
              </Link>
            </td>
            <td>
              {note.user}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
)
```

### Forms
Without `react-bootstrap`:
```js
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

Using `react-bootstrap`'s `Form` and `Button` components:
```js
import { Form, Button } from 'react-bootstrap'

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
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type='text'
            name='username'
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type='password'
          />
          <Button variant='primary' type='submit'>
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}
```

### Alerts
We can use the `Alert` component:
```js
const App = () => {
  const [notes, setNotes] = useState([
    // ...
  ])

  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const login = (user) => {
    setUser(user)
    setMessage(`welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }
 	
	return (
		<div className="container">
  		{(message &&
    		<Alert variant="success">
      		{message}
    		</Alert>
  		)}
  		// ...
		</div>	
	)
}
```
Note the use of the [[202102191622 - React Trick Inline If| &&]] operator.

### Navbar
```js
import { Navbar, Nav }

<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#" as="span">
        <Link style={padding} to="/">home</Link>
      </Nav.Link>
      <Nav.Link href="#" as="span">
        <Link style={padding} to="/notes">notes</Link>
      </Nav.Link>
      <Nav.Link href="#" as="span">
        <Link style={padding} to="/users">users</Link>
      </Nav.Link>
      <Nav.Link href="#" as="span">
        {user
          ? <em style={padding}>{user} logged in</em>
          : <Link style={padding} to="/login">login</Link>
        }
    </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
```


## Material UI
### Install package
```shell
npm install @material-ui/core
```

### Add the CSS link
Add the Iink for loading the CSS styesheet inside of `head` tag in *public/index.html*:
```html
<head>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
  // ...
</head>
```

### Render contents of application within a container
```js
import Container from '@material-ui/core'

const App = () => {
  // ...
  return (
    <Container>
      // ...
    </Container>
  )
}
```

### Table
```js
import {
  Container,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core'

const Notes = ({ notes }) => (
  <div>
    <h2>Notes</h2>
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {notes.map(note => (
            <TableRow key={note.id}>
              <TableCell>
                <Link to={`/notes/${note.id}`}>{note.content}</Link>
              </TableCell>
              <TableCell>
                {note.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
)
```

### Form
```js
import {
  TextField,
  Button
} from '@material-ui/core'

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
          <TextField label='username' />
        </div>
        <div>
          <TextField label='password' type='password' />
        </div>
        <div>
          <Button variant='contained' color='primary' type='submit'>
            login
          </Button>
        </div>
      </form>
    </div>
  )
}
```

### Notification/Alerts
You need to install the package since it isn't included in *MaterialUI* core package:
```shell
npm install @material-ui/lab
```

```js
import { Alert } from `@material-ui/lab`

const App = () => {
  const [notes, setNotes] = useState([
    // ...
  ])

  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const login = (user) => {
    setUser(user)
    setMessage(`welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }
 	
	return (
		<Container>
			<div>
				{(message &&
					<Alert severity='success'>
						{message}
					</Alert>
				)}
			</div>

			//...
		</Container>
	)
}
```

### Navbar
We can use component props to define how the root element of a MaterialUI component is rendered.

By defining
```js
<Button color="inherit" component={Link} to="/">
  home
</Button>
```
the `Button` component is rendered so, that its root component is `react-router-dom` `Link` which receives its path as prop field to.

The code for the navigation bar is the following:
```js
<AppBar position="static">
  <Toolbar>
    <Button color="inherit" component={Link} to="/">
      home
    </Button>
    <Button color="inherit" component={Link} to="/notes">
      notes
    </Button>
    <Button color="inherit" component={Link} to="/users">
      users
    </Button>   
    {user
      ? <em>{user} logged in</em>
      : <Button color="inherit" component={Link} to="/login">
          login
        </Button>
    }                              
  </Toolbar>
</AppBar>
```

## Styled components
### Install Package
```shell
npm install styled-components
```

Example of how to use it:
```js
import styled from 'styled-components'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
`

const Login = (props) => {
  // ...
  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username:
          <Input />
        </div>
        <div>
          password:
          <Input type='password' />
        </div>
        <Button type="submit" primary=''>login</Button>
      </form>
    </div>
  )
}
```


# Footer
---
Related:
- [[React MOC]]