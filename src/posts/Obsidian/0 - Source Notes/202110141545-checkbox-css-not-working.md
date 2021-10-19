---
date: '2021-10-14T15:45:53'
tags: ['tailwind']
title: 
published: true
description:
aliases:
references:
---

# checkbox css not working

Trying to style `<input type='checkbox' />` and it wasn't changing. Was using Twin and ergo Tailwind.

Root-cause is to be able to style it you need to install the [Tailwind forms](https://github.com/tailwindlabs/tailwindcss-forms) plugin.

```jsx
npm install @tailwindcss/forms
```

Then add it to your *tailwind.config.js* file.
```jsx
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
}
```


# Footer

---
## Related

---

## References