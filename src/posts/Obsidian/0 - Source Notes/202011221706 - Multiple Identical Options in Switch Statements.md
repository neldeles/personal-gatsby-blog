# Multiple Identical Options in Switch Statements
- if your output is the same for a given set of inputs i.e. *if input is 1 or 2 or 3 then output = "1, 2, or 3"* **ommit** the `break` statement

```js
var result = "";
switch(val) {
  case 1:
  case 2:
  case 3:
    result = "1, 2, or 3";
    break;
  case 4:
    result = "4 alone";
}
```
---
Source:	https://www.freecodecamp.org
Keywords: #javascript 
Related: [[202011221655 - Switch Statements]]