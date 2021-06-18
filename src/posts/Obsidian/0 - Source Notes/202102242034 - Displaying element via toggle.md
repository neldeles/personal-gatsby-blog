#  Displaying element via toggle
One way to do this in React is via inline CSS, having a State hook boolean value, and `if` logic.
```js
const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)

  // ...

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  // ...
}
```
Note that this code responsible for toggling visibility could be considered its own logical entity. Ergo we should extract the logic into its own separate component. We can do so by taking advantage of [[202102242042 - `props.children` (components children)|components children]].

Footer
---
Source: https://fullstackopen.com/en/part5/props_children_and_proptypes#displaying-the-login-form-only-when-appropriate
Keywords: #react 
Related:
- [[React MOC]]