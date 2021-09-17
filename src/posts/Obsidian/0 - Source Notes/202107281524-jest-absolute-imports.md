---
date: '2021-07-28T15:24:06'
tags: ['jest']
title: 
published: true
description:
aliases:
references:
---

# Jest absolute imports

In a jest test file, our imports are relative. For example:

```js
import {render} from '../../test/test-utils'
```

We can make it absolute and make jest treat it like a node module by configuring the jest config file.

In *jest.config.js*:
```js
const path = require('path')

module.exports = {
	//... settings
	moduleDirectories: ['node_modules', path.join(__dirname, 'src')]
}
```

Now any files in our `src` directory can be imported as if they were a node module. 

```js
import {render} from 'test/test-utils'
```

This is useful because if you needed to replace an import for files in different locations, you can just find and replace with the absolute import and it will just work.

---
Related: 