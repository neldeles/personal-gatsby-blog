---
date: '2021-10-28T22:25:15'
tags: storybook,
title: Using stories as components in Storybook
published: true
description:
aliases:
references:
zet_id: 20211028T222515
date_modified: 2021-10-28T22:48:52
---

# Using stories as components in Storybook

One thing I've always wondered is if it's possible to re-use a Story, or use a Story as a component.

The scenario for me was having an `All` story that displayed each individual story I had for that component (in MDX you don't need an `All` story since [you can preview multiple stories in a block](https://storybook.js.org/docs/react/writing-docs/mdx#writing-stories)). I didn't want to essentially write the same component twice.

I found the solution on [this page](https://storybook.js.org/docs/react/workflows/stories-for-multiple-components#reusing-subcomponent-stories]):

```jsx
// List.stories.js | List.stories.jsx
import React from 'react';
import List from './List';

//👇 Instead of importing ListItem, we import the stories
import { Unchecked } from './ListItem.stories';

export const OneItem = (args) => (
  <List {...args}>
    <Unchecked {...Unchecked.args} />
  </List>
);
```

Applying it to my `All` scenario, here's an [example](hook://file/51qZopvT7?p=YXRvbXMvTmF2aWdhdGlvbkl0ZW0=&n=NavigationItem%2Estories%2Ejs) of how it would look like:

```jsx
const Template = (args) => <NavigationItem {...args} />;

export const All = () => {
  return (
    <>
      <Active {...Active.args} label="Active Nav Item" tw="mb-4" />
      <Inactive {...Inactive.args} label="Inactive Nav Item" />
    </>
  );
};

export const Active = Template.bind({});
Active.args = {
  label: "Budget",
  href: "#href",
  current: true,
  icon: HomeIcon,
};

export const Inactive = Template.bind({});
Inactive.args = {
  ...Active.args,
  current: false,
};
```

# Footer

---

## Related

---

## References