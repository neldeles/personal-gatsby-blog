---
date: '2021-10-05T19:42:39'
tags: ['testing', 'storybook']
title:
published: true
description:
aliases:
references:
---

# Storybook

## Initial Setup

 Run this inside your _existing project’s_ root directory:
```shell
# Add Storybook:
npx sb init
```

The command above will make the following changes to your local environment:

-   📦 Install the required dependencies.
-   🛠 Set up the necessary scripts to run and build Storybook.
-   🛠 Add the default Storybook configuration.
-   📝 Add some boilerplate stories to get you started.


### Running Storybook

```
# Run the test runner (Jest) in a terminal:
npm run test --watchAll

# Start the component explorer on port 6006:
npm run storybook

# Run the frontend app proper on port 3000:
npm start
```


## Key Concepts

- stories
	- default CSF export 
	- named CSF export
- args
- decorators

## Unit tests with React Testing Library

> We can use React Testing Library to render the story to the DOM and run some DOM querying code to verify salient features of the output. The nice thing about the story format is that we can simply import the story in our tests, and render it there!

This is possible via the `@storybook/testing-react` addon:
> 💡 [@storybook/testing-react](https://storybook.js.org/tutorials/intro-to-storybook/react/en/composite-component/) is a great addon that allows you to reuse your Storybook stories in your unit tests. By reusing your stories in your tests, you have a catalog of component scenarios ready to be tested. Also, all args, decorators, and other information from your story will be composed by this library. As you just saw, all you have to do in your tests is select which story to render.

Create a test file called `src/components/TaskList.test.js`. Here, we’ll build out our tests that make assertions about the output.
```js
import { render } from '@testing-library/react';

import { composeStories } from '@storybook/testing-react';

import * as TaskListStories from './TaskList.stories'; //👈  Our stories imported here

//👇 composeStories will process all information related to the component (e.g., args)
const { WithPinnedTasks } = composeStories(TaskListStories);

it('renders pinned tasks at the start of the list', () => {
  const { container } = render(<WithPinnedTasks />);

  expect(
    container.querySelector('.list-item:nth-child(1) input[value="Task 6 (pinned)"]')
  ).not.toBe(null);
});
```

### Important

> Notice as well that this test is quite brittle. It's possible that as the project matures, and the exact implementation of the `Task` changes --perhaps using a different classname or a `textarea` rather than an `input`--the test will fail, and need to be updated. This is not necessarily a problem, but rather an indication to be careful about liberally using unit tests for UI. They're not easy to maintain. Instead rely on manual, snapshot, and visual regression (see [testing chapter](https://storybook.js.org/tutorials/intro-to-storybook/react/en/test/)) tests where possible.


# Footer

---

Related: 