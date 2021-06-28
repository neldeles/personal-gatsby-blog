---
date: '2021-06-27T15:57:12'
tags: ['redux', 'immer']
title: Redux and Immer 
published: true
description:
aliases:
references: ['https://www.smashingmagazine.com/2020/06/better-reducers-with-immer/', 'https://dev.to/mercatante/simplify-your-redux-reducers-with-immer-3e51', 'https://bjcant.dev/refactoring-reducers-with-immer/']
---

# Redux and Immer

So far, there are 2 stylistic ways of implementing Immer. From what I've understood, the difference between the 2 is one allows for currying (as explained in [Smashing Magazine](https://www.smashingmagazine.com/2020/06/better-reducers-with-immer/)).

## Allows for currying
```js
const sidebarReducer = produce((draft, action) => {
  switch (action.type) {
    case 'INIT_SIDEBAR': {
      draft.navigation[2].children = action.payload
    }
    // no default statement needed because producer that does nothing returns og state
  }
}, initState)
```

## Non-curried
```js
const sidebarReducer = (state = initState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case "INIT_SIDEBAR": {
        const wallets = action.payload.map((wallet) => {
          return {
            name: wallet.name,
            href: "#",
          };
        });

        draft.navigation[2].children = wallets;
        break;
      }
      default:
        // immer returns initial state implicitly
        break;
    }
  });
```

# Footer
---
Related: 