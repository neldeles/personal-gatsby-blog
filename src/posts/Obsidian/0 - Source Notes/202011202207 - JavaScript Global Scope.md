# JavaScript Global Scope

- variables defined outside of function block have *Global* scope
	- seen everywhere in your JS code
- Variables which are used without the `var` keyword are automatically created in the `global` scope. 
	- This can create unintended consequences elsewhere in your code or when running a function again. You should always declare your variables with `var`.
- it's possible to have both local and global variables with the same name
	- `local` variable takes precedence over the `global` variable
^0f5bb9
---
Source: https://www.freecodecamp.org
Keywords: #javascript 
Related: [[202011202208 - JavaScript Local Scope]]