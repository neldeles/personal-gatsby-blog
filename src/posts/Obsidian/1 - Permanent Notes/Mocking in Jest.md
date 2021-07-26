---
date: '2021-07-11T21:52:36'
tags: ['jest']
title: 
published: true
description:
aliases:
references:
---

# Mocking in Jest
## Monkey patching via `jest.spyon` 

```js
const thumbWar = require('../thumb-war')
const utils = require('../utils')

test('returns winner', () => {
  jest.spyOn(utils, 'getWinner')
  utils.getWinner.mockImplementation((p1, p2) => p1)

  const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler')
  expect(winner).toBe('Kent C. Dodds')
  expect(utils.getWinner.mock.calls).toEqual([
    ['Kent C. Dodds', 'Ken Wheeler'],
    ['Kent C. Dodds', 'Ken Wheeler']
  ])

  // cleanup
  utils.getWinner.mockRestore()
})
```

- the `.spyOn` method will replace the `getWinner` on utils with an empty mock function
  - we  have a specific implementation that we want to use for our mock function, so we pass in our custom implementation to `.mockImplementation`
  -  we make `getWinner` deterministic—it will always return p1
 
 Why use this in the first place? So we can **verify that the function was called correctly.** That requires keeping track of how often the function was called and what arguments it was called with. That way we can make assertions on how many times it was called and ensure it was called with the right arguments.
 
 This is still a form of monkey-patching which is fine because we are using CommonJS, but could lead to problems in the future, especially if we want to mock a ESModule export which doesn’t allow this kind of monkey-patching on exports. 
 
 More future proof method is mocking the entire module.
 
 ## Mocking the module with `jest.mock`
 
```js
jest.mock('../utils', () => {
  return {
    getWinner: jest.fn((p1, p2) => p1)
  }
})

test('returns winner', () => {
  const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler')
  expect(winner).toBe('Kent C. Dodds')
  expect(utilsMock.getWinner.mock.calls).toEqual([
    ['Kent C. Dodds', 'Ken Wheeler'],
    ['Kent C. Dodds', 'Ken Wheeler']
  ])

  // cleanup
  utils.getWinner.mockReset()
})
```
 First argument is the relative path to the module we're mocking. Second argument is a module factory function that will `return` the mocked version of the module. Here, we can `return` an object that has `getWinner` and that would be a `jest.fn()` with our mock implementation.
 
 For the cleanup, we want to run `mockReset()`.
 
 ### Sharing a mock module
 Often you’ll want to mock the same file throughout all the tests in your codebase. So let’s make a shared mock file in Jest's `__mocks__` directory which Jest can load for us automatically.
 
 In **src/__mocks__/utils.js**:
```js
module.exports = {
  getWinner: jest.fn((p1, p2) => p1)
}
```

In **src/__tests__/external_mock_module**:
```js
const thumbWar = require('../thumb-war')
const utilsMock = require('../utils')

jest.mock('../utils')

test('returns winner', () => {
  const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler')
  expect(winner).toBe('Kent C. Dodds')
  expect(utilsMock.getWinner.mock.calls).toEqual([
    ['Kent C. Dodds', 'Ken Wheeler'],
    ['Kent C. Dodds', 'Ken Wheeler']
  ])

  // cleanup
  utilsMock.getWinner.mockReset()
})
```

## Mock HTTP requests with MSW
Mocking an API module works, but it's incomplete because we have to make all these assertions that we're calling it properly and then we'd need to write some other tests for the API module itself to make sure that it responds properly to those calls. 

We can use a package called [MSW](https://mswjs.io/) to intercept and handle those HTTP requests instead so we can get a great deal more confidence.

TLDR: we can mock modules using the above if they have no API requests; if they do have requests, use MSW.

# Footer
---
Related: 