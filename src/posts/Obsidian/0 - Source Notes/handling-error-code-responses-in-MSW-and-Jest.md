---
date: '2021-10-24T22:56:47'
tags: #jest #try-catch #msw #useEffect
title: 
published: true
description:
aliases:
references:
zet_id: 20211024T225647
---

# Handling error code responses in MSW, useEffect and Jest

When a user loads my app, I first want to check if the user had already previously logged in. If yes, we load the user data. If not, we return error 403. We do this via MSW:

```js
// Checks if user is already logged in
  rest.get("http://localhost:5000/auth/is-verify", (req, res, ctx) => {
    // Check if the user is authenticated in this session
    const isAuthenticated = localStorage.getItem("token");

    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: "Not authorized",
        })
      );
    }

    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        name: "BTS",
        email: "bts@email.com",
      })
    );
  })
```

The HTTP request is called via a `useEffect` hook. The problem was that if I uncommented out this `useEffect` hook, my previously passing jest test would now fail with `Request failed with status code 403`.

The jest test just checks "calls onSubmit with the username and password when submit is clicked" aka for a successful login. It's failing because `Error 403` would stop the test even before it could try to login. 

Solution is to handle the rejection promise.

```jsx
// old useEffect that results in Error 403
useEffect(() => {
    const getUser = async () => {
        const response = await verifyService();
        setUser(response.data);
    };

    getUser();
  }, []);

// new useEffect
useEffect(() => {
    const getUser = async () => {
      try {
        const response = await verifyService();
        setUser(response.data);
      } catch (error) {
        setUser(null);
      }
    };

    getUser();
  }, []);
```



# Footer

---
## Related

---

## References