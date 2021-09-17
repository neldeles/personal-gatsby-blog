# JavaScript Spread Operator

```js
// argument to a function
const arr = [6, 89, 3, 45];
const maximus = Math.max(...arr); // returns 89

// in an array literal
const arr1 = ['JAN', 'FEB', 'MAR', 'APR', 'MAY'];
let arr2;

arr2 = [...arr1]; // returns ['JAN', 'FEB', 'MAR', 'APR', 'MAY']
```
- it unpacks/"spreads" the array
	- `Math.max()` only acceps comma separated numbers, so we use the Spread Operator to unpack/"spread"
- only works when evaluating arrays in place i.e.:
	- argument to a function
	- in an array literal
- can use it to merge multiple objects
  - in the case of a key collision, the right-most (last) object's value wins out
	- this means you can use it to overwrite default properties in a React component
```js
const person1 = { name: 'David Walsh', age: 33 };
const person2 = { name: 'David Walsh Jr.', role: 'kid' };

const merged = {...person1, ...person2}
/*
Object {
  "name": "David Walsh Jr.",
  "age": 33,
  "role": "kid",
}
*/
```


---
Source:
Keywords: #javascript #es6 
Related: [[202011202205 - Functions]]
, [[202011300442 - JavaScript Rest Parameter]]
, [[202012181610 - Combine Arrays with the Spread Operator]]