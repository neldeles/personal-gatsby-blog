---
date: '2021-10-23T11:22:43'
tags: [faker, testing, kent-dodds, test-data-bot, test-factory]
title: 
published: true
description:
aliases:
references:
zet_id: 20211023T112243
---

# Reduce ambiguity in your tests using test factories

The values and variables in your tests are a form of documentation as well. They can serve to highlight what is and isn't important to your tests. This is where test factories come in and help in reducing ambiguity. They make it clear which values are important.

```js
import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test ('submitting the form calls onSubmit with username and password', () => {
	cost handleSubmit jest. fn()
	render (‹Login onSubmit={handleSubmit} />)
	const username = 'chucknorris'
	const password = 'i need no password'
	  
	userEvent.type(screen.getByLabelText(/username/i), username)
	userEvent.type(screen.getByLabelText(/password/i), password)
	userEvent.click(screen.getByRole('button', {name: /submit/i}))
	expect (handleSubmit) toHaveBeenCalledwith({
		username,
		password,
	}
	expect (handleSubmit).toHaveBeenCalledTimes(1)
})
```

For example, in the above, the user (aka other dev reading your code) might assume that the values assigned to `username` and `password` are important to the test i.e. test will fail with different values. To communicate that these are just arbitrary values, we can use the `faker` library.

Code will now look like this: 

```js
import React from 'react'
import {render, screen} from '@testing-library/react'
import faker from 'faker'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test ('submitting the form calls onSubmit with username and password', () => {
	cost handleSubmit jest. fn()
	render (‹Login onSubmit={handleSubmit} />)
	  
	// values are arbitrary
	const username = faker.internet.username()
	const password = faker.internet.password()
	  
	userEvent.type(screen.getByLabelText(/username/i), username)
	userEvent.type(screen.getByLabelText(/password/i), password)
	userEvent.click(screen.getByRole('button', {name: /submit/i}))
	expect (handleSubmit) toHaveBeenCalledwith({
		username,
		password,
	}
	expect (handleSubmit).toHaveBeenCalledTimes(1)
})
```

You can build utility functions for them if it is something you will be using in multiple tests:

```js
import React from 'react'
import {render, screen} from '@testing-library/react'
import faker from 'faker'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

function buildLoginlform(overrides) {
	return {
		username: faker.internet.userName(),
		password: faker.internet.password(),
		...overrides
	}
}

test ('submitting the form calls onSubmit with username and password', () => {
	cost handleSubmit jest. fn()
	render (‹Login onSubmit={handleSubmit} />)
	  
	// values are arbitrary
	const {username, password} = buildLoginForm()
	  
	userEvent.type(screen.getByLabelText(/username/i), username)
	userEvent.type(screen.getByLabelText(/password/i), password)
	userEvent.click(screen.getByRole('button', {name: /submit/i}))
	expect (handleSubmit) toHaveBeenCalledwith({
		username,
		password,
	}
	expect (handleSubmit).toHaveBeenCalledTimes(1)
})
```

## `test-data-bot`

If you will need more complex fake data, can use the `test-data-bot` library. 

```js
import React from 'react'
import {render, screen} from '@testing-library/react'
import {build, fake} from '@jackfranklin/test-data-bot'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

const buildLoginForm = build({
	fields: {
		username: fake(f => f.internet.userName()),
		password: fake(f => f.internet.password()),
	}
})

test ('submitting the form calls onSubmit with username and password', () => {
	cost handleSubmit jest. fn()
	render (‹Login onSubmit={handleSubmit} />)
	  
	// values are arbitrary
	const {username, password} = buildLoginForm()
	  
	userEvent.type(screen.getByLabelText(/username/i), username)
	userEvent.type(screen.getByLabelText(/password/i), password)
	userEvent.click(screen.getByRole('button', {name: /submit/i}))
	expect (handleSubmit) toHaveBeenCalledwith({
		username,
		password,
	}
	expect (handleSubmit).toHaveBeenCalledTimes(1)
})
```


# Footer

---
## Related

---

## References

- [lesson170.mp4](hook://file/4oQN274vW?p=RXBpY1JlYWN0IC0gRXBpYyBSZWFjdCBQcm8vNy4gVGVzdGluZyBSZWFjdCBBcHBzICs=&n=lesson170%2Emp4)