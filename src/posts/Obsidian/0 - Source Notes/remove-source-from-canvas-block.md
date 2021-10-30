---
date: '2021-10-29T17:54:51'
tags: storybook,
title:
published: false
description:
aliases:
references: ['https://github.com/storybookjs/storybook/issues/14686']
zet_id: 20211029T175451
date_modified: 2021-10-29T18:06:40
---

# Remove view source option from Canvas block

In Storybook, the code in the `Source` block is sometimes confusing/useless. There are 2 ways to handle this, albeit both for MDX docs only.

1. Render a standalone story i.e. don't wrap it in a `Canvas` block

		<Story name="Cool bro">
			<RadComponent />
		</Story>

2. Use the `withSource` prop of `Canvas`

		<Canvas withSource="none">
  			<h1>no source</h1>
		</Canvas>

# Footer

---

## Related

---

## References

- https://github.com/storybookjs/storybook/issues/14686