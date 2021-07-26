---
date: '2021-07-09T13:37:35'
tags: ['react-testing-library']
title: 
published: true
description:
aliases:
references:['https://testingjavascript.com/lessons/react-test-react-portals-with-within-from-react-testing-library']
---

# `within` utility function
If you only want to query for elements *within* an element, can import the `within` utility function of react-testing-library:

```js
import {within} from '@testing-library/react'

test('modal shows the children', () => {
	render(
		<Modal>
			<div data-testid="test" />
		</Modal>
	)
	const {getByTestId} = within(document.getElementById('modal-root'))
	expect(getByTestId('test')).toBeInTheDocument()
})
```

# Footer
---
Related: 