---
date: '2021-10-11T17:28:56'
tags: ['tailwind', 'storybook', 'twin']
title:
published: true
description:
aliases:
references:
date_modified: 2021-11-01T08:45:13
---

# Twin + Storybook

For your UI components to not look wonky, the `Global Styles` of Tailwind needs to be used.

I used an [example](https://github.com/ben-rogerson/twin.examples/tree/master/storybook-emotion) from the official Twin docs as a guide.

The gist is to edit `.storybook/preview.js`:
```js
import React from 'react'
import { GlobalStyles, theme } from 'twin.macro'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

const cache = createCache({ prepend: true, key: 'twin' })

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'centered',
  backgrounds: {
    default: 'electric-ribbon',
    values: [
      {
        name: 'electric-ribbon',
        value: `linear-gradient(180deg, ${theme`colors.electric`}, ${theme`colors.ribbon`})`,
      },
    ],
  },
  controls: { expanded: true },
  options: {
    storySort: (a, b) => {
      // We want the Welcome story at the top
      if (b[1].kind === 'Welcome') {
        return 1
      }

      // Sort the other stories by ID
      // https://github.com/storybookjs/storybook/issues/548#issuecomment-530305279
      return a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, { numeric: true })
    },
  },
}

export const decorators = [
  Story => (
    <CacheProvider value={cache}>
      <GlobalStyles />
      <Story />
    </CacheProvider>
  ),
]
```

# Footer

---

## Related

---

## References