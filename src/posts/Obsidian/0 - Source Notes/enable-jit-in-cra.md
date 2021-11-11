---
date: '2021-10-31T20:57:46'
tags: tailwind, create-react-app, storybook
title: Enable JIT in create-react-app
published: false
description:
aliases:
references:
zet_id: 20211031T205746
date_modified: 2021-11-01T10:24:11
---

# Enable JIT in create-react-app

- Add `mode='jit'` in tailwind.config.js

For Linux and Mac users, prefix `TAILWIND_MODE=watch` in the start script
```js
"start": "TAILWIND_MODE=watch craco start"
// if using storybook add it there too
"storybook": "TAILWIND_MODE=watch start-storybook -p 6006 -s public",
```

# Footer

---

## Related

---

## References

- [create-react-app + tailwindcss + jit = magic. : reactjs](https://www.reddit.com/r/reactjs/comments/p06g4x/createreactapp_tailwindcss_jit_magic/)