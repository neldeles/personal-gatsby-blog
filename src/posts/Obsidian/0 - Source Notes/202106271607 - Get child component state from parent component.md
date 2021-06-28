---
date: '2021-06-27T16:07:33'
tags: ['react']
title: 
published: true
description:
aliases:
references: ['https://linguinecode.com/post/get-child-component-state-from-parent-component']
---

# Get child component state from parent component

Use callback functions and `useEffect` to check if there were any changes.

Parent component:
```js
function App() {

  const eventhandler = data => console.log(data)

  return <ChildComponent onChange={eventhandler} />;
}
```

Child component:
```js
function ChildComponent(props) {

  const [formData, setFormData] = React.useState({ username: '', password: '' });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  React.useEffect(() => {
    if (props.onChange) {
      props.onChange(formData)
    }
  }, [formData.username, formData.password])

  return (
    <>
      <div>
        <div>Username:</div>
        <input name="username" onChange={handleChange} />
      </div>
      <br />
      <div>
        <div>Password:</div>
        <input name="password" onChange={handleChange} />
      </div>
      <br />
    </>
  );
}
```
# Footer
---
Related: 