---
aliases:
tags: ['vim']
references:
- 'https://stackoverflow.com/questions/11723169/selecting-entire-function-definition-in-vim#:~:text=If%20your%20cursor%20is%20on,brace%20block%20with%20d%20a%20%7D%20.'
---

# Select function definition
Given a function block:
```js
function () {
	//...
}
```

To select that entire function block and use an operator on it, whether that's delete or yank:
1. Go to the function definition line
2. `f{` to put cursor on the bracket/parenthesis
3. `V%d` visual mode by line, select up to the matching bracket, then delete


# Footer
---
Related: 