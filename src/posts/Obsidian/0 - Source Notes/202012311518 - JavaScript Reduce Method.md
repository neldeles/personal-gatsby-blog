# Reduce Method
- `Array.prototype.reduce()`, or simply `reduce()`, is the most general of all array operations in JavaScript 
	- You can solve almost any array processing problem using the reduce method
	- **TLDR**: iterates over each item in an array and returns a single value
		- achieved via a callback function that is called on each iteration
			- callback function accepts four arguments:
				- **accumulator**: which gets assigned the return value of the callback function from the previous iteration
				- **current element being processed**
				- **index of above element**
				- **array upon which `reduce` is called**
		- `reduce` has an additional `parameter` for the initial value of the **accumulator**
### Example 1
Returns the sum of all the users ages.
```js
const users = [
  { name: 'John', age: 34 },
  { name: 'Amy', age: 20 },
  { name: 'camperCat', age: 10 }
];

// 0 is the intial value for the accumulator
const sumOfAges = users.reduce((sum, user) => sum + user.age, 0);
console.log(sumOfAges); // 64
```
### Example 2 
Return an object containing the names of the users as properties with their ages as values.
```js
const users = [
  { name: 'John', age: 34 },
  { name: 'Amy', age: 20 },
  { name: 'camperCat', age: 10 }
];

const usersObj = users.reduce((obj, user) => {
  obj[user.name] = user.age;
  return obj;
}, {});
console.log(usersObj); // { John: 34, Amy: 20, camperCat: 10 }
```
---
Source:
Keywords: #javascript 
Related: 
- [[JavaScript Functional Programming MOC]]
- [[202012281617 - Use the map Method to Extract Data from an Array]]
- [[202012291730 - Use the filter Method to Extract Data from an Array]]