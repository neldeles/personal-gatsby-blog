# Spinal Tap Case
**Problem:** Convert a string to spinal case. Spinal case is all-lowercase-words-joined-by-dashes.

## Solution
```js
function spinalCase(str) {
  // Create a variable for the white space and underscores.
  var regex = /\s+|_+/g;

  // Replace low-upper case to low-space-uppercase
  str = str.replace(/([a-z])([A-Z])/g, "$1 $2");

  // Replace space and underscore with -
  return str.replace(regex, "-").toLowerCase();
}
```
- important to highlight here is the use of `$n`

Footer
---
Source:
Keywords: #javascript 
Related:
- [[JavaScript Intermediate Algorithm Scripting]]