# Conditional (Ternary) Operator 
- one line if-else expression
`condition ? expression-if-true : expression-if-false;`

## Replacing If-Else
```js
function findGreater(a, b) {
  return a > b ? "a is greater" : "b is greater";
}
```
### Replacing If-Else-If
```js
function findGreaterOrEqual(a, b) {
  if (a === b) {
    return "a and b are equal";
  }
  else if (a > b) {
    return "a is greater";
  }
  else {
    return "b is greater";
  }
}
//----------------------------------
function findGreaterOrEqual(a, b) {
  return (a === b) ? "a and b are equal" 
    : (a > b) ? "a is greater" 
    : "b is greater";
}
```
---
Source:
Keywords: #javascript 
Related: [[202011271517 - If-Else]], [[202011221749 - JavaScript Replacing If-Else Chains with Switch]]