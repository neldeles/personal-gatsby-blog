---
date: '2021-10-31T14:28:25'
tags: tailwindcss, storybook,
title:
published: false
description:
aliases:
references: ['https://stackoverflow.com/questions/65495912/storybook-tailwind-how-should-i-add-tailwind-to-storybook']
zet_id: 20211031T142825
date_modified: 2021-10-31T14:31:17
---

# Installing Tailwind in Storybook

After installing Tailwind (just follow the installation guide in the official docs), make sure to modify webpack configuration and import `../src/index.css` in **.storybook/preview.js**.

```js
const path = require('path')

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [
              require('tailwindcss'),
              require('autoprefixer'),
            ],
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    })
    return config
  },
}
```

# Footer

---

## Related

---

## References

- https://stackoverflow.com/questions/65495912/storybook-tailwind-how-should-i-add-tailwind-to-storybook