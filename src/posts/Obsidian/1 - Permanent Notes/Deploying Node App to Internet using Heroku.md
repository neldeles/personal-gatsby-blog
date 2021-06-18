# Deploying Node app to Internet using Heroku
1. [[202101302143 - Enabling CORS in Node| Connect fron-end to back-end by enabling Cross-region Sharing (CORS) on your front-end project]]
2. [[202101302146 - Node Heroku Setup| Move app to Internet via setting up Heroku]]
3. [[202101310255 - Creating a production build with create-react-app| Set up front-end production build]]
4. [[Deploying Node App to Internet using Heroku#Configure Node backend to display front-end of production build|Configure Node backend to display front-end of production build (server static files from backend)]]
5. [[Deploying Node App to Internet using Heroku#Streamlining configuration|Streamlining step 4 (deployment of front-end)]]
6. [[Deploying Node App to Internet using Heroku#Fix the Proxy in your frontend project|Fix the Proxy in the frontend project]]


## Configure Node backend to display front-end of production build
Copy the `build` folder generated in your front-end project after completing step 3. **Make sure to change the directory:**
```bash
cp -r build ../../../osa3/notes-backend
```
Make `express` show *static* content built-in middleware called **static**. How this works is whenever express gets an HTTP GET request it will first check if the _build_ directory contains a file corresponding to the request's address. If a correct file is found, express will return it.
```js
app.use(express.static('build'))
```
Now that both the frontend and the backend are at the same address, we can declare _baseUrl_ as a relative URL. This means we can leave out the part declaring the server.
```js
import axios from 'axios'

// old baseUrl
// const baseUrl = 'http://localhost:3001/api/notes'
const baseUrl = '/api/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// ...
```
After the change, in your front-end project create a new production build and copy it to the root of the backend repository.

The application can now be used from the _backend_ address [http://localhost:3001](http://localhost:3001/).

### Streamlining configuration
Go to the _package.json_ of the backend repository and add the ff scripts to automate commands. Make sure to change the directory declared in `build:ui`.

```json
{
  "scripts": {
    //...
    "build:ui": "rm -rf build && cd ../../osa2/materiaali/notes-new && npm run build --prod && cp -r build ../../../osa3/notes-backend/",
    "deploy": "git push heroku master",
    "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && npm run deploy",    
    "logs:prod": "heroku logs --tail"
  }
}
```
You can then use the above to automate building and deploying i.e.:
```bash
npm run deploy:full
```


## Fix the Proxy in your frontend project
We set `baseUrl` to relative in step 4 since both frontend and backend are located in the same address (heroku). This however will cause an issue in your dev environment. When you launch your front-end server (via `npm start`), its address is at `localhost:3000`. Therefore requests are routed to `localhost:3000/api/notes`. Our backend server address is `localhost:3001`.

This problem is easily fixed if we are using `create-react-app`. Navigate to your front-end project's `package.json` file:
```bash
  "dependencies": {
    // ...
  },
  "scripts": {
    // ...
  },
  "proxy": "http://localhost:3001"}
```
After a restart, the React development environment will work as a proxy. If the React code does an HTTP request to a server address at _[http://localhost:3000](http://localhost:3000/)_ not managed by the React application itself (i.e. when requests are not about fetching the CSS or JavaScript of the application), the request will be redirected to the server at _[http://localhost:3001](http://localhost:3001/)_.



Footer
---
Source:
Keywords: #programming #node #setup #heroku
Related: [[Node MOC]]