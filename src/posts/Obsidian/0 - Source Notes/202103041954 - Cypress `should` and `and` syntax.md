# Cypress `should` and `and` syntax
This
```js
it('login fails with wrong password', function() {
  // ...

  cy.get('.error').contains('wrong credentials')
})
```
can be expressed the same using the [should](https://docs.cypress.io/api/commands/should.html) syntax:
```js
it('login fails with wrong password', function() {
  // ...

  cy.get('.error').should('contain', 'wrong credentials')
})
```

List of the most common assertions which can be used with `should` can be found [here](https://docs.cypress.io/guides/references/assertions.html#Common-Assertions). `should` should always be chained with `get` (or another chainable command).

We can, for example, make sure that the error message is red and it has a border:

```js
it('login fails with wrong password', function() {
  // ...

  cy.get('.error').should('contain', 'wrong credentials') 
  cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
  cy.get('.error').should('have.css', 'border-style', 'solid')
})
```

Cypress requires the colors to be given as [rgb](https://rgbcolorcode.com/color/red).

## `and` syntax

Because all tests are for the same component we accessed using [cy.get](https://docs.cypress.io/api/commands/get.html#Syntax), we can chain them using [and](https://docs.cypress.io/api/commands/and.html).

```js
it('login fails with wrong password', function() {
  // ...

  cy.get('.error')
    .should('contain', 'wrong credentials')
    .and('have.css', 'color', 'rgb(255, 0, 0)')
    .and('have.css', 'border-style', 'solid')
})
```

Footer
---
Source:
Keywords: #cypress #testing 
Related:
- [[End to End Testing in React]]