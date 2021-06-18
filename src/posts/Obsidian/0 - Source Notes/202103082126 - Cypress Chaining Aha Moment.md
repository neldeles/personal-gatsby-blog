# Cypress Chaining Aha Moment 
Aha moment when I came across this in their documentation:
> What you want to do is call `cy` again, which automatically creates a new chain scoped to the `document`.

Chaining = making scope more granular and dependent on the last yielded element. So let's say I have a toggable component:
```html
<div data-cy='Blog' style={blogStyle}>
	<div style={hideWhenVisible} data-cy='Blog-preview'>
		// ...
	</div>
	<div data-cy='Blog-complete' style={showWhenVisible}>
		// ...
	</div>
</div>
```

If I click button in `Blog-preview` to reveal `Blog-complete`, I reset the scope after the click by ending the chaining:

```js
it('user cannot delete another users blog', function () {
	cy.get('[data-cy=Blog-preview]').contains('test 5 title')
		.find('button[data-cy=Blog-view]')
		.click()
	cy.get('[data-cy=Blog-complete]').contains('test 5 title')
 })
```

This will then select the now visible `test 5 title` element of `Blog-complete` instead of the now hidden `Blog-preview`.

Footer
---
Source: https://docs.cypress.io/api/commands/contains.html#Scopes
Keywords: #cypress #testing 
Related: