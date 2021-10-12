---
date: '2021-10-12T10:49:16'
tags: ['testing', 'storybook']
title: 
published: true
description:
aliases:
references: ['https://storybook.js.org/tutorials/intro-to-storybook/react/en/simple-component/', 'https://storybook.js.org/docs/react/workflows/snapshot-testing']
---

# Snapshot testing in Storybook

Add the dev dependency of the Storybook addon:
```bash
npm i -D @storybook/addon-storyshots react-test-renderer
```

Then create an `src/storybook.test.js` file with the following in it:
```js
// src/storybook.test.js
import initStoryshots from '@storybook/addon-storyshots';
initStoryshots();
```


# Footer

---
## Related

---

## References

- https://storybook.js.org/docs/react/workflows/snapshot-testing
- https://storybook.js.org/tutorials/intro-to-storybook/react/en/simple-component/