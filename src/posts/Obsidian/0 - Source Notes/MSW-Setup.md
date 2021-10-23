---
date: '2021-10-19T17:24:07'
tags: ['msw']
title: Mock Service Worker Setup 
published: true
description:
aliases:
references:
zet_id: 20211019T172407
---

# Mock Service Worker Setup

Install MSW:
```bash
npm install msw --save-dev
```

## Define mocks
Create a mocks folder in your root: `src/mocks`.  Create a module to store all your request handlers: `src/mocks/handlers.js`.

We can now start mocking a REST API. In `handlers.js` import the essentials needed for mocking a REST API.
```jsx
import {rest} from 'msw'
```
 
### Request handler

To handle a REST API request, need to specify:
- method
- path
- function that returns the mocked response

Here's an example for two requests:
- `POST /login` to allowe user to login
- `GET /user` to return the information aboutthe logged in user

### Response resolver

To respond to an intercepted request we have to specify a mocked response using a response resolver function.

Response resolver is a function that accepts the following arguments:

-   `req`, an information about a matching request;
-   `res`, a functional utility to create the mocked response;
-   `ctx`, a group of functions that help to set a status code, headers, body, etc. of the mocked response.

```jsx
import {rest} from 'msw'

export const handlers = [
  // Handles a POST /login request
  rest.post('/login', (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem('is-Authenticated', 'true')

    return res(
      // Respond with a 200 status code
      ctx.status(200),
    )
  }),

  // Handles a GET /user request
  rest.get('/user', (req, res, ctx) => {
    // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem('is-authenticated')

    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        }),
      )
    }

    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      }),
    )
  }),
]
```

## Integrate

Next step is to integrate the mocking. Our request handlers can be shared between browser and Node environments but since Service Workers cannot run in Node, the integration process is different depending on the environment.

### Browser

We now need to register the Service Worker responsible for requests interception.

Execute the `init` command of MSW CLI:
```bash
npx msw init <PUBLIC_DIR> --save
```

`PUBLIC_DIR` differs per JS framework. For create-react-app it's: 

```bash
npx msw init public/ --save
```

#### Configure worker

Next step is to configure our worker. Create `src/mocks/browser.js`. In the `browser.js` file we are going to create a worker instance with our request handlers defined earlier.
```js
import { setupWorker } from 'msw'
import { handlers } from './handlers'
// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers)
```

#### Start Worker

In order for our mock definition to execute during the runtime, it needs to be imported into our application's code. However, since mocking is a development-oriented technique, we will be importing our `src/mocks/browser.js` file conditionally, [depending on the current environment](CRA-and-NODE_ENV.md)[^1].
```jsx
// src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start()
}

ReactDOM.render(<App />, document.getElementById('root'))
```

Your browser's console should now display the ff: `[MSW] Mocking enabled`.

[^1]: You don't need to create a `.env` for this one as CRA sets up the three `NODE_ENV` environments for us



### Node

1. Need to [configure the server](https://mswjs.io/docs/getting-started/integrate/node#configure-server). 
2. [configure API mocking as a part of our tests setup](https://mswjs.io/docs/getting-started/integrate/node#setup) aka set it up globally. If using CRA, global set up is [simple](https://create-react-app.dev/docs/running-tests/#initializing-test-environment). Just create `src/setupTests.js` and paste the ff:
      ```js
		// src/setupTests.js
		import { server } from './mocks/server.js'
		// Establish API mocking before all tests.
		beforeAll(() => server.listen())

		// Reset any request handlers that we may add during the tests,
		// so they don't affect other tests.
		afterEach(() => server.resetHandlers())

		// Clean up after the tests are finished.
		afterAll(() => server.close())
        ```

If you want to keep it on a per test file level, it would look something like this:

```jsx
import React from "react";
import { render, waitFor } from "@testing-library/react";
import App from "./App";
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

const server = setupServer(…..handlers);

beforeALl( fn: () => server. listen());
afterALL( fn: () => server. close());
afterEach( fn: () => server. resetHandlers());

test( name: "renders welcome message when user is fetched successfully", fn: async () =>{
	const { getByText } render (<App />);
	expect (getByText ( text: /Loading.../ ). toBeInTheDocument();
	await waitFor callback: () =>
	expect (getByText ( text: /Welcome, RedhwanNacef./i)).toBeInTheDocument()
}	
```

# Footer

---
## Related

- [[msw-axios-react]]

---

## References
- https://mswjs.io/docs/getting-started/mocks