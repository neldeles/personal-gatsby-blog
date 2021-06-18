# Use the filter Method to Extract Data from an Array
- `filter` calls a function on each element of an array and returns a new array containing only the elements for which that function returns `true` 
	- TLDR: it filters the array, based on the function passed to it
	- Like `map`, it does this without needing to modify the original array
```js
// filter users younger than 30
const users = [
  { name: 'John', age: 34 },
  { name: 'Amy', age: 20 },
  { name: 'camperCat', age: 10 }
];

const usersUnder30 = users.filter(user => user.age < 30);
console.log(usersUnder30); // [ { name: 'Amy', age: 20 }, { name: 'camperCat', age: 10 } ]
```
## Implementing the `filter` method on a Prototype
In order to understand the `filter` method better, we can implement it ourselves:
```js
// The global variable
var s = [23, 65, 98, 5];

Array.prototype.myFilter = function(callback) {
  // Only change code below this line
  var newArray = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i])) {
      newArray.push(this[i]);
    }
  }
  // Only change code above this line
  return newArray;
};

var new_s = s.myFilter(function(item) {
  return item % 2 === 1;
});
```
---
Source:
Keywords: #javascript 
Related: 
- [[JavaScript Functional Programming MOC]]
- [[202011202144 - Manipulating Arrays]]
- [[202012301933 - Example of Using Map and Filter Together]]