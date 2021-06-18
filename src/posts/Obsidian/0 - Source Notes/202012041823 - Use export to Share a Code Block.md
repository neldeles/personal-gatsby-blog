# Use export to Share a Code Block 
- you have script `math_functions.js` with an `add` function
	- you can use this `add` function in your future scripts via `export`
	- this is similar to `import` statements in Python

Exporting as a list:
```js
const add = (x, y) => {
  return x + y;
}

const subtract = (x, y) => {
  return x - y;
}

export { add, subtract };
```

Exporting individually:
```js
export const add = (x, y) => {
  return x + y;
}

export const subtract = (x, y) => {
  return x - y;
}
```

The above are named exports. There can be zero or more exports per module. When importing them, **it is mandatory to use the same function name**.

# Footer
---
Source:
Keywords: #javascript #es6 
Related: 
- [[202012041725 - Create a Module Script]]
- [[202012041827 - Reuse JavaScript Code Using import]]
- [[202012071434 - Create an Export Fallback with export default]]