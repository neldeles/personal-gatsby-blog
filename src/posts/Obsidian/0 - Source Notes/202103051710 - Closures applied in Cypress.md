# Closures applied in Cypress
If you’re familiar with [native Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) the Cypress `.then()` works the same way. You can continue to nest more Cypress commands inside of the `.then()`.

==Each nested command has access to the work done in previous commands. This ends up reading very nicely.== (This is taking advantage of closures)

```js
cy.get('button').then(($btn) => {

  // store the button's text
  const txt = $btn.text()

  // submit a form
  cy.get('form').submit()

  // compare the two buttons' text
  // and make sure they are different
  cy.get('button').should(($btn2) => {
    expect($btn2.text()).not.to.eq(txt)
  })
})

// these commands run after all of the
// other previous commands have finished
cy.get(...).find(...).should(...)
```

The commands outside of the `.then()` will not run until all of the nested commands finish.

Footer
---
Source: https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html#Closures
Keywords: #cypress #javascript 
Related: