---
date: '2021-10-31T21:22:59'
tags: storybook, create-react-app,
title:
published: false
description:
aliases:
references:
zet_id: 20211031T212259
date_modified: 2021-10-31T21:27:14
---

# babel loader issue with Storybook and create-react-app

[babel-loader conflicts with create-react-app version · Issue #5183 · storybookjs/storybook](https://github.com/storybookjs/storybook/issues/5183)

Temp solution is to add the following to your package.json: `"resolutions" : { "babel-loader": "8.1.0"}`

Delete node_modules and yarn.lock after then run `yarn install`.

Note that this fix only works for yarn. There are fixes for npm in that thread.

# Footer

---

## Related

---

## References