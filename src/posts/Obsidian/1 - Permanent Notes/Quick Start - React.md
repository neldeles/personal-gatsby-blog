# Create a React Project via `create-react-app`
Navigate to the folder where you want your project folder to be created. Note that `part1` is the folder name of the project.
```bash
npx create-react-app part1
npm start
```

## Quick Backend for Front-End Prototyping via `JSON Server`
Install `json-server` as a development dependency (only used during development):
```bash
npm install json-server --save-dev
```
Afterwards, add the following line in your `package.json` file:

```js
{
  // ... 
  "scripts": {
    // ..., 
    "server": "json-server -p3001 --watch db.json"  
  },
}
```
- 3001 because `create-react-app` uses port 3000

We'll then be able to start the `json-server` from the project root directory without needing parameter definitions:

Old:
```bash
npx json-server --port 3001 --watch db.json
```
New:
```
npm run server
```

### To pull data from backend server
We can use either `fetch` or the `axios` library. The `axios` library functions like `fetch` but is more pleasant to use. Read more about it in [[202102190653 - Axios Library]].
```bash
npm install axios
```

Footer
---
Source:
Keywords: #programming #react #setup
Related: [[React MOC]]
