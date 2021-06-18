# Requiring a `prop` in a component
The _Togglable_ component assumes that it is given the text for the button via the _buttonLabel_ prop. If we forget to define it to the component:

```js
<Togglable> buttonLabel forgotten... </Togglable>
```

The application works, but the browser renders a button that has no label text.

We would like to enforce that when the _Togglable_ component is used, the button label text prop must be given a value.

The expected and required props of a component can be defined with the [prop-types](https://github.com/facebook/prop-types) package. Let's install the package:

```bash
npm install prop-types
```

We can define the _buttonLabel_ prop as a mandatory or _required_ string-type prop as shown below:

```js
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  // ..
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
```

The console will display the following error message if the prop is left undefined:
![[15.png]]

Let's also define PropTypes to the _LoginForm_ component:

```js
import PropTypes from 'prop-types'

const LoginForm = ({
   handleSubmit,
   handleUsernameChange,
   handlePasswordChange,
   username,
   password
  }) => {
    // ...
  }

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
```

If the type of a passed prop is wrong, e.g. if we try to define the _handleSubmit_ prop as a string, then this will result in the following warning:
![[16.png]]

Footer
---
Source: https://fullstackopen.com/en/part5/props_children_and_proptypes#prop-types
Keywords: #react #react_components
Related:
- [[React MOC]]