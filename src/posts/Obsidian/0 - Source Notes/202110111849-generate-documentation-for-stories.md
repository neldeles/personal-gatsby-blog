---
date: '2021-10-11T18:49:39'
tags: ['storybook']
title: 
published: true
description:
aliases:
references:['https://storybook.js.org/tutorials/design-systems-for-developers/react/en/document/']
---

# Generate documenation for stories

The first one I found: 
```js
export const Sizes = (args) => (
  <div>
    <Avatar {...args} size="large" />
    <Avatar {...args} size="medium" />
    <Avatar {...args} size="small" />
    <Avatar {...args} size="tiny" />
  </div>
);

Sizes.args = {
  username: 'Tom Coleman',
  src: 'https://avatars2.githubusercontent.com/u/132554',
};

Sizes.parameters = {
	docs: {
	// The story now contains a description
	storyDescription: '4 sizes are supported.',
	},
};
```

Second way:
```js
export const Danger = Template.bind({});
Danger.args = {
  variant: "danger",
};

Danger.parameters = {
  docs: {
    description: {
      story:
        "Use when the action will delete data or be otherwise difficult to recover from. Destructive buttons should trigger a confirmation dialog before the action is completed. Be thoughtful about using destructive buttons because they can feel stressful for the user.",
    },
  },
};
```

# Footer

---
## Related

---

## References
- https://storybook.js.org/tutorials/design-systems-for-developers/react/en/document/
- https://storybook.js.org/docs/react/writing-docs/doc-blocks