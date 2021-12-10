---
date: '2021-12-10T08:37:18'
tags: react-query, typescript,
title: Handling `undefined` in React Query and Typescript
published: false
description:
aliases:
references:
zet_id: 20211210T083718
date_modified: 2021-12-10T09:08:15
---

`useQuery` can return undefined because:
> Generally, on the first render cycle, data will be `undefined` because well, the data is async and does not exist yet on the frontend. The component will render in the `loading` state in this case with the `isLoading` flag set to `true`. so that you can act accordingly.

So can use the `isLoading` flag to act accordingly. However, things change a bit when you use either `placeholderData` or `initialData`. [If you use either one, the query will not be in *loading* state, but go directly to *success* state.](https://tkdodo.eu/blog/placeholder-and-initial-data-in-react-query#:~:text=It%20further%20means%20that%20if%20either%20one%20of%20these%20is%20supplied%2C%20our%20query%20will%20not%20be%20in%20loading%20state%2C%20but%20will%20go%20directly%20to%20success%20state.)Wrt to `undefined`, the difference between the two though is that with `initialData`, data will never be `undefined`. This is because if it errors, the query will be in *error* state, but your initial *data* will still be there. For `placeholderData`, query will be in *error* state **and** *data* will be `undefined`.[^1]

Regardless though, one constant remains. The typescript types atm will **always** return a union with `undefined`. In simpler terms... the return type of `useQuery` will always be `T | undefined`. [`placeholderData` nor `initialData` do not narrow the type](https://github.com/tannerlinsley/react-query/discussions/1331#discussioncomment-809549).

This means you will always need to handle for `undefined` and the simplest way I've seen is to just use a **nullish coalescing operator**.

```tsx
const { data } = useQuery("active-events", () => getEventsAsync());
const events = data ?? []

return (
	events.map(event => `Some ${event}.`)
)
```

**Non-null assertion** is also possible, but then you'd have to assert whenever you call `data`.

Another way to deal with `undefined` is [by using the object returned by `useQuery` instead of destructuring](https://tkdodo.eu/blog/react-query-and-type-script#type-narrowing). By doing so, Typescript  can narrow the type when using the status field or one of the status booleans:

```tsx
const { data, isSuccess } = useGroups()
if (isSuccess) {
  // 🚨 data will still be `Group[] | undefined` here
}

const groupsQuery = useGroups()
if (groupsQuery.isSuccess) {
  // ✅ groupsQuery.data will now be `Group[]`
}
```

[^1]: https://github.com/tannerlinsley/react-query/discussions/1301#discussioncomment-1524367

# Footer

---

## Related

---

## References

- https://github.com/tannerlinsley/react-query/discussions/1331
- https://github.com/tannerlinsley/react-query/discussions/1301