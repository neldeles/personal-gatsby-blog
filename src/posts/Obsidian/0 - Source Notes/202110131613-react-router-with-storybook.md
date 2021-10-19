---
date: '2021-10-13T16:13:32'
tags: ['storybook', 'react-router']
title: react-router with Storybook
published: true
description:
aliases:
references:
---

# react-router with Storybook

```jsx
import { BrowserRouter as Router } from "react-router-dom";

<Canvas>
  <Story name="Breadcrumbs">
    <Router>
      <Breadcrumbs parents={parents} />
    </Router>
  </Story>
</Canvas>
```
The downside is that when you click "Show code" it will show:
```jsx
<Router>
	<Breadcrumbs parents={parents} />
</Router>
```
as opposed to
```jsx
<Breadcrumbs parents={parents} />
```
The solution for the issue above is to use `decorators`:
```jsx
<Canvas>
  <Story
    name="Breadcrumbs"
    decorators={[(Story) => <Router><Story /></Router>]}
  >
    <Breadcrumbs parents={parents} />
  </Story>
</Canvas>
```


# Footer

---
## Related

---

## References
- https://discord.com/channels/486522875931656193/490822261004042240/750272511769575445
- https://discord.com/channels/486522875931656193/490822261004042240/750356084933525544