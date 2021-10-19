---
date: '2021-10-15T14:38:25'
tags: ['create-react-app']
title: 
published: true
description:
aliases:
references: ['https://create-react-app.dev/docs/importing-a-component/#absolute-imports']
---

# Absolute imports in create-react-app

You can configure your application to support importing modules using absolute paths. This can be done by configuring a jsconfig.json or tsconfig.json file in the root of your project. If you're using TypeScript in your project, you will already have a tsconfig.json file.

Below is an example jsconfig.json file for a JavaScript project. You can create the file if it doesn't already exist:

```js
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}
```

If you're using TypeScript, you can configure the baseUrl setting inside the compilerOptions of your project's tsconfig.json file.

Now that you've configured your project to support absolute imports, if you want to import a module located at src/components/Button.js, you can import the module like so:

```js
import Button from 'components/Button';
```



# Footer

---
## Related

---

## References
- https://create-react-app.dev/docs/importing-a-component/#absolute-imports