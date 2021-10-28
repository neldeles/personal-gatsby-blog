---
date: '2021-10-25T20:25:05'
tags: jest
title:
published: true
description:
aliases:
references: ['https://testingjavascript.com/lessons/react-test-drive-mocking-react-router-s-redirect-component-on-a-form-submission']
zet_id: 20211025T202505
date_modified: 2021-10-25T20:29:47
---

# Jest waitFor

Used for asynchronous assertions. Best practice to keep your `waitFor` callback as slim as possible for better performance:

```js
test('renders a form with title, content, tags, and a submit button', async () => {
  ...

  // this is slower
  await wait(() => {
    expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {})
    expect(MockRedirect).toHaveBeenCalledTimes(2)
  })
})
```

> If we were to move this assertion to have both of these being here, then that takes a while because it keeps on trying this callback until it times out and then we get the error message. I put in a single assertion in here and then the rest of our assertions afterward. We get the failure faster which is definitely desirable here.

```js
test('renders a form with title, content, tags, and a submit button', async () => {
  ...

  // this is faster
  await wait(() => {
    expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {})
  })
  expect(MockRedirect).toHaveBeenCalledTimes(2)
})
```

# Footer

---

## Related

---

## References

- [Testing JavaScript with Kent C. Dodds](https://testingjavascript.com/lessons/react-test-drive-mocking-react-router-s-redirect-component-on-a-form-submission)