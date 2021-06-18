---
aliases:
- 'BEM-style'
tags: [ 'styled-components', 'BEM' ]
references:
- 'https://github.com/soiluong/react-styled-components#theming-and-directory-structure'
---

# BEM-style modifiders in `styled-components`
```js
import React from 'react'
import styled, {css} from 'styled-components'

const Button = styled.button.attrs({
  id: props => props.id,
  name: props => props.inputName,
  type: 'reset' // you can use static props too
})`

  /*
   * Just because we're using styled-components now doesn't mean
   * we should forget about using good CSS coding convention
   */

  // define the button structure first

  height: 25px;
  padding: 1em;
  width: 100%;

  // then use modifiers to change the look and feel!

  ${props => props.red && css`
    background-color: #ff0000;
  `}

  ${props => props.green && css`
    background-color: #00ff00;
  `}

  ${props => props.blue && css`
    background-color: #0000ff;
  `}

  ${props => props.whiteFont && css`
    background-color: #ffffff;
  `}

  ${props => props.blackFont && css`
    background-color: #000000;
  `}
`

const MyForm = props => (
  <form>
    <Button red whiteFont>
    <Button green blackFont>
    <Button blue whiteFont>
  </form>
)

export default MyForm;
```

# Footer
---
Related: 