# Node and Express App Quick Start Reference
## Project Initial Setup
Navigate to your project root and setup node:
```bash
npm init
```
Here is a sample `package.json` template result:
```json
{
  "name": "backend",
  "version": "0.0.1",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Matti Luukkainen",
  "license": "MIT"
}
```
Create `index.js` then make sure to add `"start": "node index.js",` to the `scripts` property afterwards so that we can run this program via an npm script:
```bash
npm start
```
Next is to install `express`:
```bash
npm install express
```
Then we install [[202101280343 - Nodemon|nodemon]] as a dev dependency:
```bash
npm install --save-dev nodemon
```
Afterwards define a dedicated npm script for `nodemon` in `package.json`:
```json
{
  // ..
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // ..
}
```
We can then start the app in dev mode via npm script and reap functionality of nodemon:
```bash
npm run dev
```

## Setup of the initial index.js file
1. Import `express`
2. Define two *routes* to the application
	1. event handler that handles HTTP GET requests made to app's root
	2. event handler that handles HTTP GET requests made to the _notes_ path of the application

```js
// Step 1
const express = require('express')
const app = express()

// Step 2.1
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})
//Step 2.2
app.get('/api/notes', (req, res) => {
  res.json(notes)
})
```

## Setup for PERN with JWT
Steps if setting up a project that uses PERN stack along with JWT for authentication and authorization.
```bash
npm init
```
Install the packages:
```bash
npm i express cors pg jsonwebtoken bcrypt
```


Footer
---
Source:
Keywords: #programming #node #express #setup
Related: 
- [[Node MOC]]