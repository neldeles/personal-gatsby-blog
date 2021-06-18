# Testing Node applications: Introduction
## Installing jest
We can use the `jest` testing library which is developed and used internally by Facebook. We install as a developement dependency since tests are only executed during the development of the application.
```bash
npm install --save-dev jest
```
## Setting up script in package.json
In your *package.json*, define the script for our test. We will make it report about the test execution with the *verbose* style:
```bash
{
  //...
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "build:ui": "rm -rf build && cd ../../../2/luento/notes && npm run build && cp -r build ../../../3/luento/notes-backend",
    "deploy": "git push heroku master",
    "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && git push && npm run deploy",
    "logs:prod": "heroku logs --tail",
    "lint": "eslint .",
    "test": "jest --verbose"  },
  //...
}
```
### Specifying the execution environment
#### Option 1
Jest requires one to specify that the execution environment is Node. This can be done by adding the following to the end of _package.json_:
```js
{
 //...
 "jest": {
   "testEnvironment": "node"
 }
}
```
#### Option 2
Alternatively, Jest can look for a configuration file with the default name _jest.config.js_, where we can define the execution environment like this:

```js
module.exports = {
  testEnvironment: 'node',
};
```

## Allow jest in your eslintrc file
The ESLint configuration we added to the project in the previous part complains about the `test` and `expect` commands in our test file, since the configuration does not allow _globals_. Let's get rid of the complaints by adding _"jest": true_ to the _env_ property in the _.eslintrc.js_ file.

```js
module.exports = {
  "env": {
    "commonjs": true 
    "es6": true,
    "node": true,
    "jest": true,  },
  "extends": "eslint:recommended",
  "rules": {
    // ...
  },
};
```
## Create your tests
In root directory, create a folder called *tests*. Jest expects by default that the names of test files contain _.test_. In this course, we will follow the convention of naming our tests files with the extension _.test.js_. So it will look something like this:
```
├── tests
│   └── palindrome.test.js
│   └── average.test.js
├── utils
│   ├── config.js
│   ├── logger.js
│   └── middleware.js  
```
This is what a *.test.js* file could look like:
```js
const average = require('../utils/for_testing').average

describe('average', () => {
  test('of one value is the value itself', () => {
    expect(average([1])).toBe(1)
  })

  test('of many is calculated right', () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
  })

  test('of empty array is zero', () => {
    expect(average([])).toBe(0)
  })
})
```
- in the first line, we import the function to be tested
-  expect wraps the resulting value into an object that offers a collection of _matcher_ functions, that can be used for verifying the correctness of the result. 
	-  since in this test case we are comparing two strings, we can use the [toBe](https://facebook.github.io/jest/docs/en/expect.html#tobevalue) matcher
		-  you can refer to [[202102090433 - Jest Test Scenarios|this]] for more test scenarios
-  describe blocks can be used for grouping tests into logical collections
## Running your Jest tests
You can run the entire test with:
```bash
npm run test
```
If one test is failing, only run that test while fixing the issue. You can do this via the the [only](https://facebook.github.io/jest/docs/en/api.html#testonlyname-fn-timeout) method. 

Another way of running a single test (or describe block) is to specify the name of the test to be run with the [\-t](https://jestjs.io/docs/en/cli.html) flag:

```js
npm test -- -t 'when list has only one blog, equals the likes of that'
```
The parameter can also contain just a part of the name e.g. will run all of the tests that contain *notes* in their name:
```js
npm test -- -t 'notes'
```

You can also run one *test.js* file:
```js
npm test -- tests/note_api.test.js
```

Footer
---
Source:
Keywords: #programming #node #testing #jest 
Related:
- [[Node MOC]]
- [[Testing Node applications - 1 - Backend]]