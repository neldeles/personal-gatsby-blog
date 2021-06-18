# Node Heroku setup
In Terminal, navigate to your project's root directory then login Heroku:
```bash
heroku login
```
Add a file called `Procfile` to the project's root to tell Heroku how to start the app:
```
web: npm start
```
Change the definition of the port application uses at the bottom of `index.js` like so:
```js
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```
If you still haven't initialized git for your project, do so now. **Make sure to create a `.gitignore` file and exclude `node_modules`.**

While still in your project's root directory, [add a Heroku Git remote](https://devcenter.heroku.com/articles/git#creating-a-heroku-remote):
```bash
heroku create
```
Confirm that a remote named `heroku` has been set for your app:
```bash
git remote -v
```
Commit your code to the project repository and move it to Heroku with:
```bash
git push heroku master //(or main instead of master)
```
If everything went well, your heroku app should now work:
![[25ea.png]]

Footer
---
Source:
Keywords: #heroku #node 
Related: [[Deploying Node App to Internet using Heroku]]