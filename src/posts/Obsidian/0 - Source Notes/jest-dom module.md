---
date: '2021-10-21T15:46:31'
tags: ['jest']
title: 
published: true
description:
aliases:
references: ['https://testingjavascript.com/lessons/react-use-jest-dom-for-improved-assertions-1b50ee8e']
zet_id: 20211021T154631
---

# `jest-dom` module

There are multiple ways to use the module. 

One thing that we can do is we could just say `import * as jestDOM`. We could just extend expect `jestDOM`. That's a little bit nicer. 

```js
import * as jestDOM from '@testing-library/jest-dom'

expect.extend(jestDOM)
```

It'd be even nicer if we didn't have to do these two lines of code at all. What we can do instead is simply import the file `extend-expect`, which is basically doing the same thing.

```js
import '@testing-library/jest-dom/extend-expect'
```

Even better, I have just configured in this project to automatically import this in every test. I can just get rid of that import and have those assertions available to me. 

# Footer

---
## Related
- [jest-assertions](jest-assertions.md)
---

## References
- https://testingjavascript.com/lessons/react-use-jest-dom-for-improved-assertions-1b50ee8e