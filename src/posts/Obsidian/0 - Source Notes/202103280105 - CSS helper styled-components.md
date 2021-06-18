---
aliases:
tags: ['styled-components']
references:
- 'https://dev.to/saichai/thank-me-later-use-styled-components-s-css-helper-everywhere-2ni1'
---

# CSS helper styled-components
Always use it for nested template literals and for conditional rendering.

[Nested template literal example](https://styled-components.com/docs/api#css):
```js
import styled, { css } from 'styled-components'

const complexMixin = css`
  color: ${props => (props.whiteColor ? 'white' : 'black')};
`

const StyledComp = styled.div`
  /* This is an example of a nested interpolation */
  ${props => (props.complex ? complexMixin : 'color: blue;')};
`
```

For conditional rendering example can look at [[202103280021 - BEM-style modifiers in styled-components]]

# Footer
---
Related: 