---
date: '2021-10-13T16:13:32'
tags: ['storybook', 'react-router']
title: react-router with Storybook
published: true
description:
aliases:
references:
date_modified: 2021-11-01T21:25:33
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

## CSF

The above is for MDX. For CSF, you can declare it at either the Story/Component/Global level.

Component level:

```jsx
import { Link } from ".";
import { BrowserRouter as Router } from "react-router-dom";

export default {
  title: "components/atoms/Link",
  component: Link,
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
  parameters: {
    componentSubtitle: "Placeholder subtitle",
    docs: {
      source: {
        type: "dynamic",
        excludeDecorators: true,
      },
    },
  },
};

const Template = (args) => <Link {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: "Some Link text over here",
};
```

For global level, you need to edit **.storybook/preview.js**:

```jsx
import { BrowserRouter as Router } from "react-router-dom";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: ["Introduction", ["Intro", "Installation"], "components"],
    },
  },
};

export const decorators = [
  (Story) => (
    <Router>
      <Story />
    </Router>
  ),
];
```

# Footer

---

## Related

---

## References

- https://discord.com/channels/486522875931656193/490822261004042240/750272511769575445
- https://discord.com/channels/486522875931656193/490822261004042240/750356084933525544