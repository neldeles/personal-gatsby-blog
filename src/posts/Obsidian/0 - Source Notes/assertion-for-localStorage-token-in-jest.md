---
date: '2021-10-25T19:29:11'
tags: #jest #testing
title: 
published: true
description:
aliases:
references:
zet_id: 20211025T192911
---

# Assertion for localStorage token in Jest

```js
test('allows the user to login', async () => {
  //...some tests
	
  // Assert successful login state
  expect(alert).toHaveTextContent(/welcome/i)
  expect(window.sessionStorage.getItem('token')).toEqual(fakeUserResponse.token)
})

test('handles login exception', () => {
  // Assert meaningful error message shown to the user
  expect(alert).toHaveTextContent(/sorry, something went wrong/i)
  expect(window.sessionStorage.getItem('token')).toBeNull()
})
```

# Footer

---
## Related

---

## References

- [mswjs/msw: Seamless REST/GraphQL API mocking library for browser and Node.js.](https://github.com/mswjs/msw)