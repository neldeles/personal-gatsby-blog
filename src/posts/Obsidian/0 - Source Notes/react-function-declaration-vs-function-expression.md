---
date: '2021-11-03T20:09:10'
tags: react, kent-dodds,
title:
published: false
description:
aliases:
references:
zet_id: 20211103T200910
date_modified: 2021-11-03T20:11:34
---

# function declaration vs expression in React

Kent prefers function declarations to take advantage of hoisting.

```js
thisWorks()

function thisWorks() {}

thisThrowsAnError()

var thisThrowsAnError = function () {}
```

# Footer

---

## Related

---

## References

- https://kentcdodds.com/blog/function-forms