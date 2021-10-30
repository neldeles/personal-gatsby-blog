---
date: '2021-10-30T10:05:12'
tags: storybook
title: Adding a description to a Story
published: true
description: Adding a description to a Storybook Story in either CSF or MDX.
aliases:
references:
zet_id: 20211030T100512
date_modified: 2021-10-30T14:45:25
---

# Adding a description to a Story

## CSF

Can use the `story.parameters` object:

```js
// Component level
export default {
  title: "components/atoms/SidebarFooter",
  component: SidebarFooter,
  parameters: {
    docs: {
		description: {
			component: "Cool component description"
		}
	}
  },
}
// Story level
export const Default = (args) => <SidebarFooter {...args} />;
Default.parameters = {
  docs: {
    description: {
      story: "Cool description bro"
    }
  }
}
```

## MDX

Just write normally using Markdown.

```
### SomeComponent

Some manually typed documentation text.

<Canvas withSource="none">
  <Story story={stories.NavWithButton} />
</Canvas>
```

If you'd like to use the description typed in the component JS file via JSDoc, can use the `<Description of={ComponentName} />` block.

```jsx
// Component.js
/** Some JSDoc documentation text */
function SomeComponent() {
	// do something
	return (<div>Some HTML </div>)
}

// Component.stories.mdx
import {Title, Description} from '@storybook/addon-docs'
import {SomeComponent} from './SomeComponent'

<Title />

<Description of={SomeComponent} />
```

# Footer

---

## Related

---

## References