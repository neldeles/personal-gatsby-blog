# ESLint in React
`create-react-app` installs ESLint to the project by default, so we just need to define our desired configuration in the *.eslintrc.js* file.

>_NB:_ do not run the `eslint --init` command. It will install the latest version of ESlint that is not compatible with the configuration file created by `create-react-app`!

Next, we will start testing the frontend and in order to avoid undesired and irrelevant linter errors we will install the [eslint-plugin-jest](https://www.npmjs.com/package/eslint-plugin-jest) package:

```bash
npm install --save-dev eslint-plugin-jest
```

Create your *.eslintignore* file to the repository root w the ff:
```js
node_modules
build
```

Let's create a _.eslintrc.js_ file with the following contents:

```js
module.exports = {
  "env": {
      "browser": true,
      "es6": true,
      "jest/globals": true 
  },
  "extends": [ 
      "eslint:recommended",
      "plugin:react/recommended"
  ],
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
  },
  "plugins": [
      "react", "jest"
  ],
  "rules": {
      "indent": [
          "error",
          2  
      ],
      "linebreak-style": [
          "error",
          "unix"
      ],
      "quotes": [
          "error",
          "single"
      ],
      "semi": [
          "error",
          "never"
      ],
      "eqeqeq": "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": [
          "error", "always"
      ],
      "arrow-spacing": [
          "error", { "before": true, "after": true }
      ],
      "no-console": 0,
      "react/prop-types": 0
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

NOTE: If you are using Visual Studio Code together with ESLint plugin, you might need to add additional workspace setting for it to work. If you are seeing `Failed to load plugin react: Cannot find module 'eslint-plugin-react'`additional configuration is needed. Adding the line `"eslint.workingDirectories": [{ "mode": "auto" }]`to settings.json in the workspace seems to work. See [here](https://github.com/microsoft/vscode-eslint/issues/880#issuecomment-578052807) for more information.

Component _Togglable_ causes a nasty looking warning _Component definition is missing display name_. Fortunately this is easy to fix:

```js
import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  // ...
})

Togglable.displayName = 'Togglable'
export default Togglable
```


Footer
---
Source: https://fullstackopen.com/en/part5/props_children_and_proptypes#e-slint
Keywords: #react #eslint
Related:
- [[React MOC]]