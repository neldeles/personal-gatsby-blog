# Testing React apps
## Installing libraries
We will implement our tests using two testing libraries:
- `Jest`
	- configured by default to applications created with `create-react-app`
- `react-testing-library` (https://github.com/testing-library/react-testing-library)

Let's install `react-testing-library`:
```js
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

## Test file location
Can refer to [[202103020838 - Organizing tests in Jest]]. Note that in React, ==storing tests in the same directory as the component is the default configuration== in applications created by `create-react-app`.

## Rendering the component for tests
We will write our test in the _src/components/Note.test.js_ file, which is in the same directory as the component itself.

The first test verifies that the component renders the contents of the note:

```js
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const component = render(
    <Note note={note} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})
```

After the initial configuration, the test renders the component with the [render](https://testing-library.com/docs/react-testing-library/api#render) method provided by the react-testing-library:

```js
const component = render(
  <Note note={note} />
)
```

Normally React components are rendered to the _DOM_. The render method we used renders the components in a format that is suitable for tests without rendering them to the DOM.

`render` returns an object that has several [properties](https://testing-library.com/docs/react-testing-library/api#render-result). One of the properties is called _container_, and it contains all of the HTML rendered by the component.

In the expectation, we verify that the component renders the correct text, which in this case is the content of the note:

```js
expect(component.container).toHaveTextContent(
  'Component testing is done with react-testing-library'
)
```

## Running tests
`create-react-app` configures tests to be run in watch mode by default, which means that the `npm test` command will not exit once the tests have finished, and will instead wait for changes to be made to the code. Once new changes to the code are saved, the tests are executed automatically after which Jest goes back to waiting for new changes to be made.

If you want to run tests "normally", you can do so with the command:

```js
CI=true npm test
```

**NB:** the console may issue a warning if you have not installed Watchman. Watchman is an application developed by Facebook that watches for changes that are made to files. The program speeds up the execution of tests and at least starting from macOS Sierra, running tests in watch mode issues some warnings to the console, that can be removed by installing Watchman.

Instructions for installing Watchman on different operating systems can be found on the official Watchman website: [https://facebook.github.io/watchman/](https://facebook.github.io/watchman/)

## Searching for content in a component
`react-testing-library` package offers many different ways of investigating the content of the component being tested. Here are 3 examples:
```js
test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const component = render(
    <Note note={note} />
  )

  // method 1
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  // method 2
  const element = component.getByText(
    'Component testing is done with react-testing-library'
  )
  expect(element).toBeDefined()

  // method 3
  const div = component.container.querySelector('.note')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})
```
### Method 1: `.toHaveTextContent()`
- searches for a matching text from the entire HTML code rendered by the component
	- one of many "matcher"-methods provided by the `jest-dom` library
### Method 2: render method object's `.getByText()`
- returns the element that contains the given text
	- exception occurs if no such element exists
		- for this reason, we would technically not need to specify any additional expectation
### Method 3: `.querySelector()` method
- recieves a CSS selector as its parameter
- searches for a specific element that is rendered by the component

For methods 2 and 3, there are numerous similiar query methods [available](https://testing-library.com/docs/dom-testing-library/api-queries).

## Debugging tests
### Displaying the generated HTML in console
The object returned by the render method has a [debug](https://testing-library.com/docs/react-testing-library/api#debug) method that can be used to print the HTML rendered by the component to the console. Let's try this out by making the following changes to our code:

```js
test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const component = render(
    <Note note={note} />
  )

  component.debug()
  // ...
})
```
If we then [[Testing React apps#Running tests|run our test]] (`CI=true npm test`), the console will display the HTML generated by `component`.
#### Displaying a smaller part of the HTML in console
Need the `prettyDOM` method that can be imported from `@testing-library/dom` package that is automatically installed with `react-testing-library`:
```js
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const component = render(
    <Note note={note} />
  )
  const li = component.container.querySelector('li')
  
  console.log(prettyDOM(li))
})
```
In our example above, we used the selector to find the _li_ element inside of the component.

## Clicking buttons in tests
In addition to displaying content, the _Note_ component also makes sure that when the button associated with the note is pressed, the _toggleImportance_ event handler function gets called.

Testing this functionality can be accomplished like this:

```js
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Note from './Note'

// ...

test('clicking the button calls event handler once', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const mockHandler = jest.fn()

  const component = render(
    <Note note={note} toggleImportance={mockHandler} />
  )

  const button = component.getByText('make not important')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})
```

There's a few interesting things related to this test. The event handler is [mock](https://facebook.github.io/jest/docs/en/mock-functions.html) function defined with Jest:

```js
const mockHandler = jest.fn()
```

The test finds the button _based on the text_ from the rendered component and clicks the element:

```js
const button = component.getByText('make not important')
fireEvent.click(button)
```

Clicking happens with the [fireEvent](https://testing-library.com/docs/api-events#fireevent) method.

The expectation of the test verifies that the _mock function_ has been called exactly once.

```js
expect(mockHandler.mock.calls).toHaveLength(1)
```

[Mock objects and functions](https://en.wikipedia.org/wiki/Mock_object) are commonly used stub components in testing that are used for replacing dependencies of the components being tested. Mocks make it possible to return hardcoded responses, and to verify the number of times the mock functions are called and with what parameters.

In our example, the mock function is a perfect choice since it can be easily used for verifying that the method gets called exactly once.

## Tests for the Togglable component
Add a `className` to the part of the component you are testing so you can easily target it:
```js
import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
```

Create your test file in the respective location:
```js
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Togglable from './Togglable'

describe('<Togglable />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" />
      </Togglable>
    )
  })

  test('renders its children', () => {
    expect(
      component.container.querySelector('.testDiv')
    ).toBeDefined()
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show...')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

})
```

The `beforeEach` function gets called before each test, which then renders the `Togglable` component into the `component` variable

The first test verifies that the `Togglable` component renders its child component `<div className="testDiv" />`.

The remaining tests use the [toHaveStyle](https://www.npmjs.com/package/@testing-library/jest-dom#tohavestyle) method to verify that the child component of the `Togglable` component is not visible initially, by checking that the style of the `div` element contains `{ display: 'none' }`. Another test verifies that when the button is pressed the component is visible, meaning that the style for hiding the component _is no longer_ assigned to the component.
### Verifying that visible content can be hidden by clicking the second button of the component
```js
test('toggled content can be closed', () => {
  const button = component.container.querySelector('button')
  fireEvent.click(button)

  const closeButton = component.getByText('cancel')
  fireEvent.click(closeButton)

  const div = component.container.querySelector('.togglableContent')
  expect(div).toHaveStyle('display: none')
})
```

## Testing the forms
Just as with the *click* event, we simulate *text input* with the `fireEvent` function of `react-testing-library`. 
```js
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NoteForm from './NoteForm'

test('<NoteForm /> updates parent state and calls onSubmit', () => {
  const createNote = jest.fn()

  const component = render(
    <NoteForm createNote={createNote} />
  )

  const input = component.container.querySelector('input')
  const form = component.container.querySelector('form')

  fireEvent.change(input, { 
    target: { value: 'testing of forms could be easier' } 
  })
  fireEvent.submit(form)

  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing of forms could be easier' )
})
```
We can simulate writing to `input` fields by creating a `change` event to them, and defining an object, which contains the text 'written' to the field.

The form is sent by simulating the `submit` event to the form.
The first test expectation ensures, that submitting the form calls the `createNote` method. The second expectation checks, that the event handler is called with the right parameters - that a note with the correct content is created when the form is filled.

## Test Coverage
We can easily find out the [coverage](https://github.com/facebookincubator/create-react-app/blob/ed5c48c81b2139b4414810e1efe917e04c96ee8d/packages/react-scripts/template/README.md#coverage-reporting) of our tests by running them with the command:
```js
CI=true npm test -- --coverage
```
A quite primitive HTML report will be generated to the _coverage/lcov-report_ directory. The report will tell us the lines of untested code in each component:
![[19ea.png]]


Footer
---
Source:
Keywords: #programming #react #jest #react-testing-library
Related:
- [[React MOC]]