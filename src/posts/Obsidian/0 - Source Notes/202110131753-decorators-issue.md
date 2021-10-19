---
date: '2021-10-13T17:53:19'
tags: ['storybook']
title: Decorators issue
published: true
description:
aliases:
references: ['https://github.com/storybookjs/storybook/issues/12022']
---

# Decorators issue

Decorators are typically used to wrap stories with extra markup. It is also useful to ensure that the story remains a “pure” rendering of the component under test, and any extra HTML or components you need to add don’t pollute that.

However, the issue I faced was that the extra markup was still being rendered in the Storybook Docs `Source` block. This was a [common issue](https://github.com/storybookjs/storybook/issues/12022). The [solution](https://github.com/storybookjs/storybook/issues/12022#issuecomment-859540813) is also found in that thread. TLDR is that it's an opt-out setting.

```jsx
export default {
  title: "Atom/Input/Helper",
  component: Helper,
  parameters: { 
	  // opting out
	  docs: {
          source: {
            type: 'dynamic',
            excludeDecorators: true,
          },
        },
  }
}
```

Rather than setting this per story, can also set this globally in *.storybook/preview.js*


# Footer

---
## Related

---

## References
- [Source: Dynamic snippets includes decorators · Issue #12022 · storybookjs/storybook](https://github.com/storybookjs/storybook/issues/12022)