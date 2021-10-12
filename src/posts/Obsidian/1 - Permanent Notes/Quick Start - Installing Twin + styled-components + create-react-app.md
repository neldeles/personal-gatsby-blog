---
aliases:
tags: ['twin', 'create-react-app', 'recipe']
references: ['https://github.com/ben-rogerson/twin.examples/tree/master/cra-styled-components#add-the-global-styles']
---

# Installing Twin in your create-react-app
If this is a new React project:
```shell
npx init create-react-app my-app
```

If it is an existing React project and you want to install Twin in it, you just need to install the dependencies:
```shell
npm install twin.macro tailwindcss styled-components
```

## Add the global styles
Import `GlobalStyles` within a new file placed in `src/styles/GlobalStyles.js`:
```js
// src/styles/GlobalStyles.js
import React from 'react'
import { createGlobalStyle } from 'styled-components'
import tw, { theme, GlobalStyles as BaseStyles } from 'twin.macro'

const CustomStyles = createGlobalStyle`
  body {
    -webkit-tap-highlight-color: ${theme`colors.purple.500`};
    ${tw`antialiased`}
  }
`

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
)

export default GlobalStyles
```
I've set this to `.twinglobal` in my Alfred snippets.

Then import the *GlobalStyles* file in `src/index.js`:
```js
// src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import GlobalStyles from './styles/GlobalStyles'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
```

## Add the twin config
In `package.json`:
```js
{
  "babelMacros": {
	"twin": {
	  "config": "./tailwind.config.js",
	  "preset": "styled-components",
	  "styled": {
		"import": "default",
		"from": "styled-components"
	  },
	  "css": {
		"import": "css",
		"from": "styled-components"
	  },
	}
  },
  //... 
}
```
I've set this to `.twinconfig` in my Alfred snippets.

### Create your tailwind config file
This isn't required since Twin makes all Tailwind classes and variants available to us. But we most likely will need the config file to store our theme values.

So in your project root create `tailwind.config.js`:
```js
// './tailwind.config.js'
module.exports = {
  darkMode: false,
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [],
}
```
I've set this to `.twindconfig` in my Alfred snippets.

# Footer

---
## Related

---

## References
- https://github.com/ben-rogerson/twin.examples/tree/master/cra-styled-components#add-the-global-styles

