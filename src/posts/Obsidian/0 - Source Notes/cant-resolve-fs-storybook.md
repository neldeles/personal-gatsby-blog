---
date: '2021-10-29T14:32:49'
tags: storybook, webpack, twin
title:
published: false
description:
aliases:
references:
zet_id: 20211029T143249
date_modified: 2021-10-29T14:36:11
---

# Can't resolve fs error in Storybook

When I try importing `twin` an MDX story, I received the error: `Module not found: Error: Can't resolve 'fs' in`.

This is a webpack related issue. The solution I followed is this Github [post](https://github.com/storybookjs/storybook/issues/4082#issuecomment-758272734). Basically in `.storybook/webpack.config.js`:

```json
/**
 * The doc doesn't really mention using webpack.config.js, but .storybook/main.js instead.
 *
 * Nevertheless, configuring the webpack.config.js seems to work fine.
 *
 * @param config
 * @param mode
 * @return {Promise<*>}
 * @see https://storybook.js.org/docs/react/configure/webpack
 * @see https://storybook.js.org/docs/react/configure/webpack#using-your-existing-config
 */
module.exports = async ({
  config,
  mode,
}) => {
  /**
   * Fixes npm packages that depend on `fs` module, etc.
   *
   * E.g: "winston" would fail to load without this, because it relies on fs, which isn't available during browser build.
   *
   * @see https://github.com/storybookjs/storybook/issues/4082#issuecomment-495370896
   */
  config.node = {
    fs: 'empty',
    tls: 'empty',
    net: 'empty',
    module: 'empty',
    console: true,
  };

  return config;
};
```

# Footer

---

## Related

---

## References