---
date: '2021-10-24T09:22:18'
tags: msw, axios
title: Undefined mock response properties in MSW
published: true
description:
aliases:
references:
zet_id: 20211024T092218
date_modified: 2021-10-24T10:16:12
---

# Undefined mock response properties in MSW

I had the ff request handler and `onSubmit` event handler:

```js
// mocks/handlers.js
export const handlers = [
  // Handles a successful POST /login request
  rest.post("http://localhost:5000/auth/login", (req, res, ctx) => {
    const { email, password } = req.body;
    if (!password) {
      return res(
        ctx.status(400, "Custom status text"),
        ctx.json({ message: "password required" })
      );
    }
    if (!email) {
      return res(
        ctx.status(400, "Custom status text"),
        ctx.json({ message: "username required" })
      );
    }

    localStorage.setItem("token", "someRandomToken");
    return res(
      // Respond with a 200 status code
      ctx.status(200, "success"),
      ctx.json({
        id: 1,
        name: "BTS",
        email: "bts@email.com",
      })
    );
  })
]
```

```jsx
// components/LoginForm.js
const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      email: email,
      password: password,
      isRemembered: rememberMe,
    };

    try {
      const response = await loginService(credentials);
      if (response) {
        setUser(response.data);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error.body); // return undefined
      setErrorMessage(error.message); // undefined
      console.error("error", error.message); // undefined
    }
  };
```

Whenever I tried to login without a password or without an email, I wanted to display the `message` property from my mock response. However it always return undefined.

This didn't make sense as the [MSW documentation](https://mswjs.io/docs/api/response) shows there were valid properties to the mock response.

The fix was pretty stupid and basic actually. The HTTP request I was using was returning only the `response.data`.... hence the other properties were no longer available. 🤦‍♂️

```js
// services/loginService.js
const loginService = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  // change this to `return response` instead
  return response.data;
};
```

After the fix we can see the mock response properties are now available to us:
![](CleanShot-2021-10-24-at-09.42.26@2x.png)

## Axios errors

If it's just the error properties you're after, no need to change the above from `response.data` to `response`. That is your object if the HTTP request is successful. If your HTTP request is **unsuccessful**, you just need to access the `error.response` object.

This took me a while to figure out because when I `console.log(error)` it would just show me this:

![](CleanShot-2021-10-24-at-10.08.41@2x.png)

Apparently for requests returned with an error status, the data we need is in `error.response`. The documentation doesn't explain this pretty well. Fortunately I found [this](https://dev.to/zelig880/how-to-catch-the-body-of-an-axios-error-4lk0) blog post on it.

# Footer

---

## Related

- [[how-to-catch-the-body-of-an-axios-error]]

---

## References

- https://dev.to/zelig880/how-to-catch-the-body-of-an-axios-error-4lk0