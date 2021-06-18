# Enabling CORS in Node
In the relevant `src/services/file.js` of your frontend, change your `baseUrl`:
```js
import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// ...

export default { getAll, create, update }
```
In your backend, install Node's `cors` middleware:
```bash
npm install cors
```
Take the middleware to use and allow for requests from all origins:
```js
const cors = require('cors')

app.use(cors())
```

Footer
---
Source: https://fullstackopen.com/en/part3/deploying_app_to_internet#same-origin-policy-and-cors
Keywords: #node 
Related:
- [[Deploying Node App to Internet using Heroku]]