---
date: '2021-10-23T19:23:22'
tags: mock-service-worker, testing, jest
title:
published: true
description:
aliases:
references: ['https://github.com/mswjs/msw/issues/526']
zet_id: 20211023T192322
date_modified: 2021-10-24T10:42:06
---

# `toHaveBeenCalledWith` in MSW

```js
test('my test', () => {
  const dispatchRequest = jest.fn()
  server.on('request:start', dispatchRequest)

  expect(dispatchRequest).toHaveBeenCalledTimes(1)
})
```


I also highly recommend adding an assertion on the arguments passed to `dispatchRequest`, which is a `req` object. You may wish to check its `req.url` and method to make a good test out of such an assertion.

# Footer

---

## Related

---

## References

- https://github.com/mswjs/msw/issues/526