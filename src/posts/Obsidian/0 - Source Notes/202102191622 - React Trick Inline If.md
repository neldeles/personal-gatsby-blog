---
aliases:
- '&&'
tags: ['react']
references:
- 'https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator'
---
# Inline If with Logical && Operator 
```js
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}
```
It works because in JavaScript, `true && expression` always evaluates to `expression`, and `false && expression` always evaluates to `false`.

Therefore, if the condition is `true`, the element right after `&&` will appear in the output. If it is `false`, React will ignore and skip it.

Note that returning a falsy expression will still cause the element after `&&` to be skipped but will return the falsy expression. In the example below, `<div>0</div>` will be returned by the render method.

```js
render() {
  const count = 0;  return (
    <div>
      { count && <h1>Messages: {count}</h1>}    </div>
  );
}
```

## # [Cannot read property 'length' of null (javascript)](https://stackoverflow.com/questions/15731559/cannot-read-property-length-of-null-javascript)
You may come across this error. The solution is to add an additional logic check:
```js
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages != null && unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}
```
This check ensures `unreadMessages` is always nonnull. 


# Footer
---
Related: