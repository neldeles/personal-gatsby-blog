# JavaScript Closures
TLDR: Closures are functions with preserved data.[^1]

It is a feature of Javascript wherein the inner function has access to the outer (enclosing) function's variables-scope chain. Specifically, **the inner function will have access to the variables in the outer function scope, even after the outer function has returned.** 

For example:
```js
function foo() {
    var a = 2

    function bar() {
      console.log(a)
    }
    return bar
 }
 var baz = foo()
 baz() // 2 
```
`baz` returns the inner function, and even if we invoke `baz` later on, because of closure `bar` will still have access to the variable `a` of its outer function.

Footer
---
Source: 
Keywords: #javascript 
Related:
- [[202103051710 - Closures applied in Cypress]]

[^1]: https://www.youtube.com/watch?v=71AtaJpJHw0&ab_channel=techsith