# JavaScript `preventDefault`
## form submit
```js
const addNote = (event) => {
  event.preventDefault()
  console.log('button clicked', event.target)
}

return (
  <form onSubmit={addNote}>
    <input />
    <button type="submit">save</button>
  </form>  
)
```
The event handler immediately calls the `event.preventDefault()` method, which prevents the default action of submitting a form. The default action would, among other things, cause the page to reload.

Footer
---
Source:
Keywords: #javascript
Related: