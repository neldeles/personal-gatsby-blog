---
date: '2021-07-12T00:58:52'
tags: ['jest']
title: 
published: true
description:
aliases:
references: ['https://kentcdodds.com/blog/avoid-nesting-when-youre-testing']
---

# `describe` block in jest
Try not to use `describe` block, but instead just separate related tests in their own file. 

This means instead of a test looking like this:
```js
// __tests__/login.js
import {render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import Login from '../login'
describe('Login', () => {
  let utils,
    handleSubmit,
    user,
    changeUsernameInput,
    changePasswordInput,
    clickSubmit
  beforeEach(() => {
    handleSubmit = jest.fn()
    user = {username: 'michelle', password: 'smith'}
    utils = render(<Login onSubmit={handleSubmit} />)
    changeUsernameInput = value =>
      userEvent.type(utils.getByLabelText(/username/i), value)
    changePasswordInput = value =>
      userEvent.type(utils.getByLabelText(/password/i), value)
    clickSubmit = () => userEvent.click(utils.getByText(/submit/i))
  })
  describe('when username and password is provided', () => {
    beforeEach(() => {
      changeUsernameInput(user.username)
      changePasswordInput(user.password)
    })
    describe('when the submit button is clicked', () => {
      beforeEach(() => {
        clickSubmit()
      })
      it('should call onSubmit with the username and password', () => {
        expect(handleSubmit).toHaveBeenCalledTimes(1)
        expect(handleSubmit).toHaveBeenCalledWith(user)
      })
    })
  })
  describe('when the password is not provided', () => {
    beforeEach(() => {
      changeUsernameInput(user.username)
    })
    describe('when the submit button is clicked', () => {
      let errorMessage
      beforeEach(() => {
        clickSubmit()
        errorMessage = utils.getByRole('alert')
      })
      it('should show an error message', () => {
        expect(errorMessage).toHaveTextContent(/password is required/i)
      })
    })
  })
  describe('when the username is not provided', () => {
    beforeEach(() => {
      changePasswordInput(user.password)
    })
    describe('when the submit button is clicked', () => {
      let errorMessage
      beforeEach(() => {
        clickSubmit()
        errorMessage = utils.getByRole('alert')
      })
      it('should show an error message', () => {
        expect(errorMessage).toHaveTextContent(/username is required/i)
      })
    })
  })
})
```

It becomes like this:

```js
// __tests__/login.js
import {render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import Login from '../login'
test('calls onSubmit with the username and password when submit is clicked', () => {
  const handleSubmit = jest.fn()
  const {getByLabelText, getByText} = render(<Login onSubmit={handleSubmit} />)
  const user = {username: 'michelle', password: 'smith'}
  userEvent.type(getByLabelText(/username/i), user.username)
  userEvent.type(getByLabelText(/password/i), user.password)
  userEvent.click(getByText(/submit/i))
  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith(user)
})
test('shows an error message when submit is clicked and no username is provided', () => {
  const handleSubmit = jest.fn()
  const {getByLabelText, getByText, getByRole} = render(
    <Login onSubmit={handleSubmit} />,
  )
  userEvent.type(getByLabelText(/password/i), 'anything')
  userEvent.click(getByText(/submit/i))
  const errorMessage = getByRole('alert')
  expect(errorMessage).toHaveTextContent(/username is required/i)
  expect(handleSubmit).not.toHaveBeenCalled()
})
test('shows an error message when submit is clicked and no password is provided', () => {
  const handleSubmit = jest.fn()
  const {getByLabelText, getByText, getByRole} = render(
    <Login onSubmit={handleSubmit} />,
  )
  userEvent.type(getByLabelText(/username/i), 'anything')
  userEvent.click(getByText(/submit/i))
  const errorMessage = getByRole('alert')
  expect(errorMessage).toHaveTextContent(/password is required/i)
  expect(handleSubmit).not.toHaveBeenCalled()
})
```

> Notice also that we aren't nesting everything in a `describe` block, because it's really not necessary. Everything in the file is clearly testing the `login` component, and including even a single level of nesting is pointless.
# Footer
---
Related: 