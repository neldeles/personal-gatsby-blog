# Use the map Method to Extract Data from an Array
- iterates over each item in an array and returns a new array containing the results of calling the callback function on each element. 
	- It does this without mutating the original array

### First example:
```js
const users = [
  { name: 'John', age: 34 },
  { name: 'Amy', age: 20 },
  { name: 'camperCat', age: 10 }
];

const names = users.map(user => user.name);
console.log(names); // [ 'John', 'Amy', 'camperCat' ]
```
### Second example:
Assign a new array of objects with only `title` and `rating` keys to the `ratings` variable
```js
// The global variable
var watchList = [
  {
    "Title": "Inception",
    "Year": "2010",
    "Rated": "PG-13"
  },
  {
    "Title": "Interstellar",
    "Year": "2014",
    "Rated": "PG-13"
  },
  {
    "Title": "The Dark Knight",
    "Year": "2008",
    "Rated": "PG-13"
  }
];

const ratings = watchList.map(item => ({
  title: item["Title"],
  rating: item["imdbRating"]
}));

console.log(JSON.stringify(ratings));
```
**Code Explanation**
Using ES6 notation, each item in array is processed to extract title and rating.
Parantheses are needed to return an object.

### Implementing Own version of .map()
```js
// The global variable
var s = [23, 65, 98, 5];

Array.prototype.myMap = function(callback) {
  var newArray = [];
  for(var i=0; i<this.length;i++) {
    newArray.push(callback(this[i]));
  }
  return newArray;
};

var new_s = s.myMap(function(item) {
  return item * 2;
});
```
**Code Explanation**
The use of a “for” loop allows us to apply the callback function to every item in the Global array and then push the modified items to the empty new array that is returned in the end.
---
Source:
Keywords: #javascript 
Related: 
- [[JavaScript Functional Programming MOC]]
- [[202011202144 - Manipulating Arrays]]
- [[202012301933 - Example of Using Map and Filter Together]]