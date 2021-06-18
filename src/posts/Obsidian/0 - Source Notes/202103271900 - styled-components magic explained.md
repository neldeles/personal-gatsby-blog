---
aliases:
tags: ['styled-components']
references:
- 'https://mxstbr.blog/2016/11/styled-components-magic-explained/'
---

# `styled-components` magic explained
`styled-components` takes advantage of a ES6 feature called [[202103271904 - Tagged Template Literal]].

Tagged Template Literal essentially just call a function call — ` styled.button`` `  and `styled.button()` are almost the same thing. Their difference lies in how they handle arguments, especially if passed *interpolations*.

Template literals can accept *interpolations* in their argument. For example:
```js
const food = 'pizza'
// ${food} is an interpolation
logArgs`I like ${food}.`
// -> ['I', 'like', .] 'pizza'

logArgs('I like ${food}.')
// -> I like pizza.
```
Notice how when using tagged template literals, the interpolated content is passed as the second argument.

How is this useful you wonder? Because if your interpolation is an *interpolated function* i.e. your interpolation contains a function, it gets executed.

For example, define function `execFuncArgs()` which executes every function it gets passed as an argument:
```js
const execFuncArgs = (...args) => args.forEach(arg => {
  if (typeof arg === 'function') {
    arg()
  }
})

execFuncArgs`Hi, ${() => { console.log('Executed!') }}`
// -> "Executed!"
```

That is basically what happens in a `styled-component`:
```js
const Button = styled.button`
  font-size: ${props => props.primary ? '2em' : '1em'};
`
// ["font-size:"] props => props.primary ? '2em' : '1em'

// That's why this works:
<Button primary />
```
When you call the component `Button` (which is in itself a functional component), it has the `prop` `primary` which is passed as the value in the *interpolated function*.


# Footer
---
Related: 