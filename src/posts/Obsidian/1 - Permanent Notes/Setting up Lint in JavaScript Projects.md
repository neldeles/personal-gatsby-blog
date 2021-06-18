# Setting up Lint in JavaScript Projects
## Frontend using React
Refer to [[202103010137 - ESlint in React]].
## Backend aka Node
Install *ESLint* as a development dependency in your backend project:

```bash
npm install eslint --save-dev
```

Create a *.eslintignore* file in the project root. Make sure to add the *build* folder:
```
build
```

### Create your *eslint config* file
If you are implementing your own rules, you first initialize a default ESLint configuration file then you can edit the created *.eslintrc.js* file.
```bash
node_modules/.bin/eslint --init
```

You can also adopt a ready-made config. Recently many projects have adopted the Airbnb [Javascript style guide](https://github.com/airbnb/javascript) by taking Airbnb's [ESlint](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) configuration into use.

If using third-party like Airbnb's `eslint-config-airbnb-base`, install it:
```bash
npx install-peerdeps --dev eslint-config-airbnb-base
```

Then create a *.eslint.js* file and extend it: 
```js
module.exports = {
  extends: 'airbnb-base',
};
```

## Running the linter
### Option 1: Manual Lint checking via execution of linter
In your *packages.json* file, create a separate `npm script` for linting. You'll then be able to use the `npm run lint` command to check every file in the project. If you want ESLint to fix what errors it can, use `npm run lint -- --fix`.

```json
{
  // ...
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    // ...
    "lint": "eslint ."
  },
  // ...
}
```

### Option 2: Install and use an ESLint plugin
The plugin will run the linter continuosly. For VS Code, you can find more information about the Visual Studio ESLint plugin [here](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

**NB** when you make changes to the _.eslintrc.js_ file, it is recommended to run the linter from the command line. This will verify that the configuration file is correctly formatted.



Footer
---
Source:
Keywords: #programming #javascript #node #eslint 
Related:
- [[Node MOC]]