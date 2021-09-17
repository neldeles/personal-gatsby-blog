---
date: '2021-08-27T11:45:23'
tags: ['javascript']
title: 
published: true
description:
aliases:
references:['https://kentcdodds.com/blog/javascript-to-know-for-react']
---

# Nullish coalescing operator
If a value is `null` or `undefined`, then you may want to fallback to some default value:

```js
// here's what we often did for this:
x = x || 'some default'
// but this was problematic for numbers or booleans where "0" or "false" are valid values
// So, if we wanted to support this:
add(null, 3)
// here's what we had to do before:
function add(a, b) {
  a = a == null ? 0 : a
  b = b == null ? 0 : b
  return a + b
}
// here's what we can do now
function add(a, b) {
  a = a ?? 0
  b = b ?? 0
  return a + b
}
// in React:
function DisplayContactName({contact}) {
  return <div>{contact.name ?? 'Unknown'}</div>
}
```


---
Related: 