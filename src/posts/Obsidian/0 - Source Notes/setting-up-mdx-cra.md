---
date: '2021-10-29T10:04:44'
tags: create-react-app, mdx, storybook,
title: Setting up MDX in create-react-app
published: false
description:
aliases:
references:
zet_id: 20211029T100444
date_modified: 2021-10-29T14:36:53
---

# Setting up MDX in create-react-app

I wanted to start using MDX for my Storybook stories but VSCode doesn't have support for MDX out of the box.

Main issues I wanted to resolve were:
1. ESLint support
2. VSCode language support
3. Emmet autocomplete

## ESLint support

I wanted this so I get notified of such as this:
![](CleanShot-2021-10-29-at-10.07.09@2x.png)

So I installed [this](https://github.com/mdx-js/eslint-mdx) plugin. For the [usage](https://github.com/mdx-js/eslint-mdx#usage) step, I needed to find out what version of ESLint CRA uses. You can find this in your `package-lock.json` file. Just `command-f`.

## VSCode language support

For language support, I used [this plugin](https://marketplace.visualstudio.com/items?itemName=JounQin.vscode-mdx). I followed both steps 1 (installation of eslint-plugin-mdx) and step 2 (enable ESLint validation for `mdx` and `md` files)

```json
// .vscode/settings.json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.options": {
    "extensions": [".js", ".jsx", ".md", ".mdx", ".ts", ".tsx"]
  },
  "eslint.validate": [
    "markdown",
    "mdx",
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

## Emmet autocomplete

Lastly, I wanted Emmet autocomplete. I followed the answer in [this Stackoverflow](https://stackoverflow.com/questions/62925426/how-to-add-emmet-support-for-mdx-markdown-react-file-types-in-vscode) post.

> In your settings.json add the ff: "emmet.includeLanguages": { "mdx": "html" }

## Twin.macro error

![cant-resolve-fs-storybook](cant-resolve-fs-storybook.md#Can't%20resolve%20fs%20error%20in%20Storybook)

# Footer

---

## Related

- [VSCode Setup](VSCode%20Setup.md)

---

## References