# Create an Export Fallback with export default
```js
// named function
export default function add(x, y) {
  return x + y;
}

// anonymous function
export default function(x, y) {
  return x + y;
}
```
- usually used if only one value is being exported from a file
- used to declare a fallback/default value for a module/file
	- ergo can **only have one value be a default export** in a module/file
- cannot use `export default` with `var`, `let`, `const`

---
Source:
Keywords: #javascript #es6 
Related: [[202012041823 - Use export to Share a Code Block]]
, [[202012101723 - Import a Default Export]]