---
date: '2021-10-22T19:17:22'
tags: ['msw']
title: 
published: true
description:
aliases:
references:
zet_id: 20211022T191722
---

# Accessing headers and body in MSW

This is what our HTTP request using Axios looks like:

```js
import axios from "axios";

const baseUrl = "http://localhost:5000/auth/login";

const loginService = async (credentials) => {
  const header = {
    headers: { token: "test" },
  }
  const response = await axios.post(baseUrl, credentials, header);
  return response.data;
};

export default loginService;
```

We are passing `credentials` to the `request.body` property of MSW's `req` object. 

`header` will be appended to the `request.headers` property.

Accessing either of these in our response resolver:

```js
import { rest } from "msw";

export const handlers = [
  // Handles a successful POST /login request
  rest.post("http://localhost:5000/auth/login", (req, res, ctx) => {
    console.log("login req", req.headers.get("token"));
    console.log("request body", req.body);
    // Persist user's authentication in the session
    // localStorage.setItem("is-Authenticated", "true");
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({ token: "someRandomToken" })
    );
  }),
}
```

Note how we use `.get()` for `req.headers`. I just inferred this from the [documentation](https://mswjs.io/docs/basics/response-resolver#conditional-response) when it used `.get()` on `req.url.searchParams`.

Update: `get()` is actually a [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) function. Another caveat is that MSW converts header values to string. So using header values for conditionals won't work i.e. `if (req.headers.get("token")) {}`. 


# Footer

---
## Related

---

## References