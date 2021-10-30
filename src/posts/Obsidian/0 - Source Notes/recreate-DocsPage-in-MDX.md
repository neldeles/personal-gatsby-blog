---
date: '2021-10-29T11:06:17'
tags: storybook
title: Recreate DocsPage in MDX
published: false
description:
aliases:
references:
zet_id: 20211029T110617
date_modified: 2021-10-29T11:11:59
---

If you want to recreate DocsPage in MDX, this is possible via [remixing it with doc blocks](https://storybook.js.org/docs/react/writing-docs/docs-page#remixing-docspage-using-doc-blocks).

There isn't official documentation for MDX, but the pull request is available on [github](https://github.com/storybookjs/storybook/pull/8855).

> Refactor DocsPage blocks - created new blocks:
>
> `<Title />` - will display the current documentation title. Accepts optional slot function or a children (text) parameter
> `<Subtitle>` - will display the parameters.componentSubtitle if set. Accepts optional slot function or a children (text) parameter
> `<Description />` - reused the previous docs/blocks/Description component, except set the current component ('.') as default. Accepts now optional children (text) parameter
> `<Primary />` - displays the primary story (the first one)
> `<Props />` - displays the primary story (the first one) props
> `<Stories />` - displays all the current doc stories, except the first one. Accepts optional title (text) parameter, by default 'Stories'.
> `<Heading />` - a section heading for docs page - it simply uses a H2 element but could be later customized.
> `<Subheading />` - a sub-section heading for docs page - it simply uses a H3 element but could be later customized.
> `<DocsStory />` - displays a <Story /> within a <Preview /> block with options: expanded, and withToolbar. If expanded, it will also display the story name and description above the story block.

Sample MDX:

```jsx
import {
  Meta,
  Story,
  ArgsTable,
  Description,
  Subtitle,
  Primary,
  Props,
  Stories,
  Title,
} from "@storybook/addon-docs";
import * as stories from "./Navigation.stories.js";
import { Navigation } from ".";

<Meta
  title="Components/Molecules/Navigation"
  component={Navigation}
  decorators={[
    (Story) => (
      <div tw="mb-4 w-1/2">
        <Story />
      </div>
    ),
  ]}
  parameters={{
    componentSubtitle:
      "To be used with the NavigationItem and NavigationItemWithSubitem components.",
  }}
/>

<Title />
<Subtitle />
<Description of={Navigation} />
<Primary />
<Props />
<Stories />
```

# Footer

---

## Related

---

## References