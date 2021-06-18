# JavaScript Destructuring Assignment
My own understanding of destructuring assignment: multiple variables on left-hand side that are assigned values.

## Extract Values from Objects
- for neatly assigning values taken directly from an object
### ES5 Code
```js
const user = { name: 'John Doe', age: 34 };

const name = user.name; // name = 'John Doe'
const age = user.age; // age = 3
```
### ES6 Code
```js
const { name, age } = user;
// name = 'John Doe', age = 34
```
## Assign Variables from Objects
- allows you to assign a new variable name when extracting values
- put new name after colon
```js
const { name: userName, age: userAge } = user;
// userName = 'John Doe', userAge = 34
```
- in layman:  *"get the value of user.name and assign it to a new variable named userName"*
### Assign Variables from Nested Objects
Given the ff object: 
```js
const user = {
  johnDoe: { 
    age: 34,
    email: 'johnDoe@freeCodeCamp.com'
  }
};
```

Here's how to extract the values of object properties and assign them to variables with the same name:

```js
const { johnDoe: { age, email }} = user;
```

And here's how you can assign an object properties' values to variables with different names:

```js
const { johnDoe: { age: userAge, email: userEmail }} = user;
```
## Assign Variables from Arrays
Similar to [[202011300451 - JavaScript Spread Operator|spread operator]]
- the spread operator unpacks all contents of an array into a comma-separated list
	- Consequently, you cannot pick or choose which elements you want to assign to variables.
- Destructuring an array lets us choose:

```js
const [a, b,,, c] = [1, 2, 3, 4, 5, 6];
console.log(a, b, c); // 1, 2, 5
```
- comma allows us to access the value at any index in an array
### Using Rest Parameter to Reassign Array Elements
```js
const [a, b, ...arr] = [1, 2, 3, 4, 5, 7];
console.log(a, b); // 1, 2
console.log(arr); // [3, 4, 5, 7]
```
- the rest element **only works correctly as the last variable in the list** 
	- you cannot use the rest parameter to catch a subarray that leaves out the last element of the original array
- ES5 equivalent is `Array.prototype.slice()`
## Use Destructuring Assignment to Pass an Object as a Function's Parameters
```js
const profileUpdate = (profileData) => {
  const { name, age, nationality, location } = profileData;
  // do something with these variables
}

// can be done in place:
const profileUpdate = ({ name, age, nationality, location }) => {
  /* do something with these fields */
}
```
- pass object into function parameter i.e. destructure the object sent into the function
- *note: the above are [[202011300429 - JavaScript Arrow (Anonymous) Functions|anonymous functions]]*
---
Source:
Keywords: #javascript #es6 
Related: [[202011300442 - JavaScript Rest Parameter]]