# Return Matched Name-Value Pairs in an Object
**Problem:** Make a function that looks through an array of objects (first argument) and returns an array of all objects that have matching name and value pairs (second argument). Each name and value pair of the source object has to be present in the object from the collection if it is to be included in the returned array.

For example, if the first argument is `[{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }]`, and the second argument is `{ last: "Capulet" }`, then you must return the third object from the array (the first argument), because it contains the name and its value, that was passed on as the second argument.

## My Solution
```js
function whatIsInAName(collection, source) {
	var sourceKeys = Object.keys(source);
	var arr = collection.filter(function(obj) {
		for(var i=0; i<sourceKeys.length;i++) {
			if(
				!obj.hasOwnProperty(sourceKeys[i]) || obj[sourceKeys[i]] !== source[sourceKeys[i]]
			) {
				return false;
			}
		}
		return true;
	});
	console.log(arr);
	return arr;
}
```

## Cleaner Solution
```js
function whatIsInAName(collection, source) { 
	var srcKeys = Object.keys(source); 
	return collection.filter(function(obj) { 
		return srcKeys.every(function(key) { 
			return obj.hasOwnProperty(key) && obj[key] === source[key]; 
		}); 
	}); 
} 
// test here 
whatIsInAName(
	[
		{ first: "Romeo", last: "Montague" }, 
		{ first: "Mercutio", last: null }, 
		{ first: "Tybalt", last: "Capulet" } 
	], 
	{ last: "Capulet" } 
);
```

Footer
---
Source:
Keywords:
Related: 
- [[JavaScript Intermediate Algorithm Scripting]]
- [[202101012127 - JavaScript `every` Method]]
- [[202012291730 - Use the filter Method to Extract Data from an Array]]
- [[202011221802 - JavaScript Objects]]