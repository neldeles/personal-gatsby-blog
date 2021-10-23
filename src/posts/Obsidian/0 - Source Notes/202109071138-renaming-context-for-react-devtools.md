---
date: '2021-09-07T11:38:15'
tags: ['react/context']
title: 
published: true
description:
aliases:
references:
---

# Renaming Context for React DevTools
> 🦉 Tip: You may notice that the context provider/consumers in React DevTools just display as `Context.Provider` and `Context.Consumer`. That doesn't do a good job differentiating itself from other contexts that may be in your app. Luckily, you can set the context `displayName` and it'll display that name for the `Provider` and `Consumer`. Hopefully in the future this will happen automatically ([learn more](https://github.com/babel/babel/issues/11241 "https://github.com/babel/babel/issues/11241")).

```js
const MyContext = React.createContext()
MyContext.displayName = 'MyContext'
```


---
Related: 