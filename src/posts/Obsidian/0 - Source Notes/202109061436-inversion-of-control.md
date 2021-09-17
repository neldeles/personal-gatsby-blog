---
date: '2021-09-06T14:36:37'
tags: ['react', 'compound-components', 'components']
title: 
published: true
description:
aliases: [compound components]
references: ['https://kentcdodds.com/blog/inversion-of-control', 'https://www.youtube.com/watch?v=AiJ8tRRH0f8&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf']
---

# Inversion of Control
> "Make your abstraction do less stuff, and make your users do that instead."

> When you're thinking about how to create a nice API for people who are trying to do things slightly differently, instead of reaching for `if` statements and ternaries, consider the possibility of inverting control. In this case, what if we just gave rendering responsibility to the user of our menu? Let's use one of React's greatest strengths of composibility:

```js
function App() {
  return (
    <Menu>
      <MenuButton>
        Actions <span aria-hidden>▾</span>
      </MenuButton>
      <MenuList>
        <MenuItem onSelect={() => alert('Download')}>Download</MenuItem>
        <MenuItem onSelect={() => alert('Copy')}>Create a Copy</MenuItem>
        <MenuItem onSelect={() => alert('Delete')}>Delete</MenuItem>
      </MenuList>
    </Menu>
  )
}
```

> The key thing to notice here is that there's no state visible to the user of the components. The state is implicitly shared between these components. That's the primary value of the compound components pattern. By using that capability, we've given some rendering control over to the user of our components and now adding an extra line in there (or anything else for that matter) is pretty trivial and intuitive. No API docs to look up, and no extra features, code, or tests to add. Big win for everyone.

# Footer
---
Related: 