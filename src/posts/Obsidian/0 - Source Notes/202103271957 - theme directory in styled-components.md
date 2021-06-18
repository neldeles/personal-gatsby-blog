---
aliases:
tags: ['styled-components']
references:
- 'https://github.com/withspectrum/spectrum/blob/alpha/src/components/button/style.js'
---

# theme directory in `styled-components`
You should set up a *theme* directory in your project which your `styled-components` can reference from.

We'll use [spectrum](https://github.com/withspectrum/spectrum) as our reference/inspiration/guide because the co-creator of `styled-componenets` regularly contributes here. So we can assume the codebase follows some best practices.

For example, in *shared/theme/index.js*:
```js
export const theme = {
  bg: {
    default: '#FFFFFF',
    reverse: '#16171A',
    wash: '#FAFAFA',
    divider: '#F6F7F8',
    border: '#EBECED',
    inactive: '#DFE7EF',
  },
  brand: {
    default: '#4400CC',
    alt: '#7B16FF',
    wash: '#E8E5FF',
    border: '#DDD9FF',
    dark: '#2A0080',
  },
  generic: {
    default: '#E6ECF7',
    alt: '#F6FBFC',
  },
  social: {
    facebook: {
      default: '#3B5998',
      alt: '#5A85DF',
    },
    twitter: {
      default: '#00ACED',
      alt: '#53D0FF',
    },
    google: {
      default: '#ea4335',
      alt: '#ea4335',
    },
    github: {
      default: '#16171A',
      alt: '#828C99',
    },
    ph: {
      default: '#D85537',
      alt: '#D85537',
    },
  },
  success: {
    default: '#00B88B',
    alt: '#00D5BD',
    dark: '#00663C',
    wash: '#D9FFF2',
    border: '#9FF5D9',
  },
  text: {
    default: '#24292E',
    secondary: '#384047',
    alt: '#67717A',
    placeholder: '#7C8894',
    reverse: '#FFFFFF',
  },
  warn: {
    default: '#E22F2F',
    alt: '#E2197A',
    dark: '#85000C',
    wash: '#FFEDF6',
    border: '#FFCCE5',
  }
};

export default theme;
```

Then in your components you can reference them like this:
```js
import styled from 'styled-components';
import theme from 'shared/theme';
import { Link } from 'react-router-dom';
import { tint, hexa } from 'src/components/globals';

export const A = styled.a`
  display: flex;
  align-items: center;
  flex: none;
`;

export const StyledLink = styled(Link)`
  display: flex;
  flex: none;
  align-items: center;
`;

export const StyledButton = styled.button`
  font-size: ${props => (props.size === 'small' ? '15px' : '16px')};
  font-weight: 600;
  color: ${theme.text.default};
  border-radius: 32px;
  padding: ${props => (props.size === 'small' ? '6px 12px' : '10px 16px')};
  background: ${theme.bg.wash};
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  -webkit-display: none;
  opacity: ${props => (props.disabled ? '0.6' : '1')};
  line-height: 1.2;
  transition: box-shadow 0.2s ease-in-out;
  .icon:not(:first-child):not(:last-child) {
    margin-right: 4px;
  }
  &:hover {
    background: ${theme.bg.border};
  }
  &:focus {
    box-shadow: 0 0 0 2px ${theme.bg.default}, 0 0 0 4px ${theme.bg.border};
    transition: box-shadow 0.2s ease-in-out;
  }
  &:active {
    box-shadow: 0 0 0 2px ${theme.bg.default},
      0 0 0 4px ${tint(theme.bg.border, -24)};
    transition: box-shadow 0.2s ease-in-out;
  }
`;

export const StyledWhiteIconButton = styled(StyledButton)`
  background-color: transparent;
  padding: 0;
  color: ${theme.text.default};
  .icon {
    margin-right: 0;
  }
`;
```
Notice the `${theme.text.default}`.


# Footer
---
Related: 