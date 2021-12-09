---
date: '2021-12-08T10:16:46'
tags: msw
title: Accessing query parameters in MSW
published: true
description: Accessing query parameters in Mock Service Worker
aliases:
references:
zet_id: 20211208T101646
date_modified: 2021-12-09T09:46:03
---

# Accessing query parameters in MSW

To access query parameters server-side, [this](https://stackoverflow.com/a/44112824/3626340) SO answer suggests:

```js
function get(req, res, next) {

  let param = req.query.foo
   .....
}
```

If using MSW however, the [docs](https://mswjs.io/docs/recipes/query-parameters) instructs to use `req.url.searchParams`. This is actually the [recommended](https://github.com/mswjs/msw/issues/207#issuecomment-641900335) approach.

> Hey, @Axnyff. Thanks for reporting this!
>
> **Please, can you try `req.url.searchParams.get('email')`?**
>
> The query parameters references via `req.query` were deprecated, as it effectively duplicates what you can access in `req.url.searchParams` using a much more comfortable `URLSearchParams` interface.
>
> > Note that `req.url` is a `URL` instance, that is not serialized when printed into stdout. That's why you see `{}`, which may falsely look like an empty object.

# Footer

---

## Related

---

## References