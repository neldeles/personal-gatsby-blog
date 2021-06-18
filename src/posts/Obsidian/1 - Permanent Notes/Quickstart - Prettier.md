---
aliases:
- 'prettier'
tags: ['vscode', 'prettier']
references:
- 'https://prettier.io/docs/en/install.html'
- 'https://glebbahmutov.com/blog/configure-prettier-in-vscode/'
---

# Prettier
## Install Prettier
```
npm install --save-dev --save-exact prettier
```

Next, create the *.prettierrc.json* file:
```shell
echo {}> .prettierrc.json
```

Create your *.prettierignore* file. The contents of which you can just copy from your *.gitignore*:
```shell
touch .prettierignore
```

## ESLint
If you're using ESLint in your project, install the ff to reduce conflicts:
```shell
npm install --save-dev eslint-config-prettier
```

Then, add eslint-config-prettier to the "extends" array in your `.eslintrc.*` file. Make sure to put it **last,** so it gets the chance to override other configs.
```json
{
  "extends": [
    "some-other-config-you-use",
    "prettier"
  ]
}
```

## My prettier config
The ff is my preferred settings as found on [this site](https://glebbahmutov.com/blog/configure-prettier-in-vscode/):
```js
{
  "trailingComma": "all",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true
}
```

Uses trailing comma, semi colons off, singlequotes.

## VSCode Configuration
When initially setting this up, I had to change the ff in my *settings.json* file as per [their instruction](https://github.com/prettier/prettier-vscode):
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
	  "[python]": {
		  "editor.defaultFormatter": null
	  },
}
```
This makes prettier the default code formatter for all files except python.


# Footer
---
Related: 