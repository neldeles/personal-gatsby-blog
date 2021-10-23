---
aliases:
tags: ['postgresql', 'heroku']
references:
- 'https://www.youtube.com/watch?v=ZJxUOOND5_A&t=12s'
---

# Deploying PERN app on Heroku

## Configure main Server file
1. Move files in your *Server*  folder to the root folder then delete the *Server* folder. This is because Heroku needs a *package.json* file in the root folder.
2. Use `PORT` as an `env` variable and make sure to change `app.listen` to use that port. 
3. `express.static` to [[202105261448 - express.static| serve your static files]]. Make sure it's only when `NODE_ENV===production` 
```js
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;

//process.env.PORT
//process.env.NODE_ENV => production or undefined

//middleware
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  //serve static content
  //npm run build
  app.use(express.static(path.join(__dirname, "client/build")));
}

//ROUTES

// ...

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});

```

## Configure database connection
1. Install the *dotenv*  library and create a *.env* file in your root folder. 
2. Create variables for your *db.js* config. 
```js
PG_USER = postgres
PG_PASSWORD = password
PG_HOST = localhost
PG_PORT = 5432
PG_DATABASE = pernstack
```
3. Use these variables in your *db.js* file.
```js
// db.js
const Pool = require("pg").Pool;
require('dotenv').config()

const devConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT
}
```
4. Set up your `connectionString`. This is the string that's going to connect to our postgres database. This comes from a Heroku addon that allows us to connect to a postgres cloud service so we can use a postgres db in our cloud app. 
```js
const Pool = require("pg").Pool;
require("dotenv").config();

const devConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
};

const prodConfig = {
  connectionString: process.env.DATABASE_URL, //heroku addon
};

const pool = new Pool(
  process.env.NODE_ENV === "production" ? prodConfig : devConfig
);

module.exports = pool;
```

## Setup scripts in package.json
### Overview on how Heroku runs your scripts
1. heroku-prebuild script (runs before dependencies are installed)
2. npm install (read package.json and see what dependencies need to be installed)
3. heroku-postbuild script (run after dependencies are installed)
4. run start script (this is where the node server.js happens)
### package.json
In *package.json* of your server file, add the ff scripts:
```js
"scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js",
    "heroku-postbuild": "cd client && npm install && npm run build"
},
```

## Setup proxy in client side
In the*package.json*  file of your **client** folder, add a `proxy` key:
```js
{
  // ....
  "proxy": "http://localhost:5000"
}
```
Can then go into the Components and remove the `http://localhost:5000` parts from the urls. For example:
```js
// EditTodo Components
import React, { Fragment, useState } from "react";

const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);

  const editText = async (id) => {
    try {
      const body = { description };
      const res = await fetch(`/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    // ...
  );
};

export default EditTodo;
```

## Setup engines in package.json and catchall method

### Setting up engine
Setting up engine in *package.json* is important because if there is a breaking change in future versions, our app will still work. This is because if engine isn't specified Heroku defaults to the latest version. You can check which version of NPM and Node are installed w the ff commands:
- `npm -v`
- `node -v`

In your *package.json* of server file:
```js
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "engines": {
    "node": "14.17.0",
    "npm": "6.14.2"
  },
  // ...
}
```

### Setting up catchall
This is optional but nice to have. If a user visits an unspecified route (e.g. www.example/goop), we can redirect them to a specific page of our app. 

In the *index.js* of your server, at the bottom of the file add the ff:
```js
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;

// ...

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
```

## Deploy to Heroku
1. Commit everything and make sure your *.gitignore* is ready. Make sure you excluded *node_modules* and *.env*
2. In bash, login to heroku: `heroku login`
3. `heroku create <name-of-your-app>` to create an empty application to put your code into
4. Install addons if needed (in our case we need the `heroku-postgresql` addon). In your bash:
```bash
heroku addons:create heroku-postgresql:hobby-dev -a <name-of-your-app>
```
Should then [[#heroku-postgresql specific| create your tables]].

5. Check if Heroku Git repository is set as a remote for our local repository: 
```bash
git remote -v
// output should look like:
heroku  https://git.heroku.com/thawing-inlet-61413.git (fetch)
heroku  https://git.heroku.com/thawing-inlet-61413.git (push)
```
If it isn't, add the remote to the local repository:
```bash
heroku git:remote -a <name-of-your-app>
```

6. Push your code to heroku:
```bash
git push heroku master
```
7. `heroku open` to open your app

### heroku-postgresql specific
Once heroku-postgresql is installed, we need to create our tables. One way is by accessing the psql shell of heroku. In your bash:
```bash
heroku pg:psql -a <name-of-your-app>
```
Can then run your sql commands e.g. those found in your *database.sql* file.

If you have multiple tables, you can write all commands in your *database.sql* file then run the ff command:
```bash
cat database.sql | heroku pg:psql -a <name-of-your-app>
```

# Footer
---
Related: 