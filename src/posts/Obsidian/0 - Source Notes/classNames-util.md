---
date: '2021-11-01T08:53:36'
tags: #tailwind 
title:
published: false
description:
aliases:
references:
zet_id: 20211101T085336
---

# `classNames utility`

Allows you to handle conditional classes without the need for a 3rd party library. Functionally similar to the [clsx](https://github.com/lukeed/clsx) library.

```js
// src/util/classNames.js
export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 Tailwind utility class to allow conditional css

 Usage example:
 <button className={
    classNames(
      'this is always applied',
      isTruthy && 'this only when the isTruthy is truthy',
      active ? 'active classes' : 'inactive classes'
      )
    }
  >
    Text
  </button>
*/
```


# Footer

---

## Related

---

## References