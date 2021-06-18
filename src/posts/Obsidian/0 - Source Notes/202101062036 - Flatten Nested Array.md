# Flatten Nested Array
Flatten a nested array. You must account for varying levels of nesting.

## Solution 1
```js
function steamrollArray(arr) {
  var flattenedArray = [];

  // Create function that adds an element if it is not an array.
  // If it is an array, then loops through it and uses recursion on that array.
  var flatten = function(arg) {
    if (!Array.isArray(arg)) {
      flattenedArray.push(arg);
    } else {
      for (var a in arg) {
        flatten(arg[a]);
      }
    }
  };

  // Call the function for each element in the array
  arr.forEach(flatten);
  return flattenedArray;
}

// test here
steamrollArray([1, [2], [3, [[4]]]]);
```
**Code Explanation**
- Create a new variable to keep flattened arrays.
- Create a function that will add non-array elements to the new variable, and for the ones that are array, loop through them to get the element.
- It does that by using recursion, if the element is an array then call the function again with a layer of array deeper to check if it is an array or not. If it is not then push that non-array element to the variable that gets returned. Otherwise, keep going deeper.
- Invoke the function, the first time you will always pass it an array, so it always falls into the isArray branch
- Return the flattened array.

**Takeaway**
The approach here is to solve it for an `array` with length 1 that is multiple levels deep. Once you've solved it for that, you then work on looping it for `array` with length > 1 (here done via the `forEach` function)


## Solution 2
```js
function steamrollArray(arr) {
  let flat = [].concat(...arr);
  return flat.some(Array.isArray) ? steamrollArray(flat) : flat;
}

steamrollArray([1, [2], [3, [[4]]]]);
```
**Code Explanation**
-   Use spread operator to concatenate each element of `arr` with an empty array
-   Use `Array.some()` method to find out if the new array contains an array still
-   If it does, use recursion to call `steamrollArray` again, passing in the new array to repeat the process on the arrays that were deeply nested
-   If it does not, return the flattened array

Footer
---
Source:
Keywords: #javascript 
Related:
- [[JavaScript Intermediate Algorithm Scripting]]