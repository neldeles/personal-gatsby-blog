---
date: '2021-10-29T12:04:15'
tags: storybook
title:
published: false
description:
aliases:
references:
zet_id: 20211029T120415
date_modified: 2021-10-29T12:04:34
---

# Module not found Storybook errors

Whenever I'd delete or rename a folder/file, Storybook is suddenly unable to resolve the import paths of my components.

My theory was it had something to do with using absolute paths for imports in CRA. 

So I made the following changes to `jsconfig.json`: 
```json
{
  "compilerOptions": {
	// old is "baseUrl": "src"
    "baseUrl": "./src"
  },
  "include": ["src"]
}
```

If this simple change doesn't fix it, the ff alternative solutions might help:
- https://github.com/storybookjs/storybook/issues/7205#issuecomment-630040491
- https://stackoverflow.com/questions/51771077/storybook-with-absolute-paths
- https://medium.com/strands-tech-corner/storybook-configuration-in-react-project-ec59869f3e7d

# Footer

---

## Related

---

## References