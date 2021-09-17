---
date: '2021-08-27T11:49:46'
tags: ['javascript']
title: 
published: true
description:
aliases: [optional chaining]
references:['https://kentcdodds.com/blog/javascript-to-know-for-react']
---

# Optional Chaining

Also known as the "Elvis Operator," this allows you to safely access properties and call functions that may or may not exist. Before optional chaining, we used a hacky-workaround that relied on falsy/truthy-ness.

```js
// what we did before optional chaining:
const streetName = user && user.address && user.address.street.name
// what we can do now:
const streetName = user?.address?.street?.name
// this will run even if options is undefined (in which case, onSuccess would be undefined as well)
// however, it will still fail if options was never declared,
// since optional chaining cannot be used on a non-existent root object.
// optional chaining does not replace checks like if (typeof options == "undefined")
const onSuccess = options?.onSuccess
// this will run without error even if onSuccess is undefined (in which case, no function will be called)
onSuccess?.({data: 'yay'})
// and we can combine those things into a single line:
options?.onSuccess?.({data: 'yay'})
// and if you are 100% certain that onSuccess is a function if options exists
// then you don't need the extra ?. before calling it. Only use ?. in situations
// where the thing on the left might not exist.
options?.onSuccess({data: 'yay'})
// in React:
function UserProfile({user}) {
  return (
    <div>
      <h1>{user.name}</h1>
      <strong>{user.bio?.slice(0, 50)}...</strong>
    </div>
  )
}
```

A word of caution around this is that if you find yourself doing `?.` a lot in your code, you might want to consider the place where those values originate and make sure they consistently return the values they should.

---
Related: 