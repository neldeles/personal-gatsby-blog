# Mutations, Side Effects and Pure Function
- Mutation: term in Functional Programming wherein you change or alter things
	- outcome is called a Side Effect
- A function should be a Pure Function: doesn't cause side effects

```js
// fixedValue isn't Mutated
var fixedValue = 4;

function incrementer() {
	return fixedValue + 1;
};
```
---
Source:
Keywords: #javascript #programming 
Related: [[JavaScript Functional Programming MOC]]