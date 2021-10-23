---
date: '2021-10-23T10:31:01'
tags: ['jest', 'react-testing-library', 'kent-dodds', 'msw']
title: 
published: true
description:
aliases:
references:
zet_id: 20211023T103101
---

# Error message assertions best practice

```jsx
test ('omitting the password results in an error', async () => {
	render (‹Login />)
	const {username} = buildLoginForm(
	userEvent.type(screen.getByLabelText(/username/i), username)
	// don't type in the password
	userEvent.click (screen.getbyRole ('button', {name: /submit/i}))
	await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
	expect (screen.getByRole('alert').textContent).toMatchInlineSnapshot(
		"password is required"
	)
})
```

Use `toMatchInlineSnapshot` so that if the error message changes i.e. from *password required* to *password is required*, just need to press U after running the test to automatically update.[^1] Using `.textContent` because we don't care if the error message is in a `div`, `span` etc. So we only snapshot the text content.

![](CleanShot-2021-10-23-at-10.53.39@2x.png)

## Inline MSW handler

However, if the error message you are testing is set in an inline MSW handler, it's better to use a variable than `.toMatchInlineSnapshot`.[^2] This is because it communicates the relationship/link between the error messages i.e. that they are the *same.*

```jsx
test ('unknown server error displays the error message' async () => {
	cost testErrorMessage = 'Oh no, something bad happened'
	server.use(
		rest.post (
		'https://auth-provider.example.com/api/login',
		async (req, res, ctx) => {
			return res(ctx. status (500), ctx. json ( {message: testErrorMessage}))
		},
	)

	render(<Login />)
	userEvent.click(screen. getByRole ('button' , {name: /submit/i}))
	await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
	expect (screen.getByRole('alert')).toHaveTextContent(testErrorMessage)
})
```

# Footer

---
## Related

---

## References

[^1]: [lesson179.mp4](hook://file/4oKGqfvW9?p=RXBpY1JlYWN0IC0gRXBpYyBSZWFjdCBQcm8vNy4gVGVzdGluZyBSZWFjdCBBcHBzICs=&n=lesson179%2Emp4)

[^2]: [lesson180.mp4](hook://file/4oMGJhIDe?p=RXBpY1JlYWN0IC0gRXBpYyBSZWFjdCBQcm8vNy4gVGVzdGluZyBSZWFjdCBBcHBzICs=&n=lesson180%2Emp4)