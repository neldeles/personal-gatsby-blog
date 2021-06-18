# Smallest Common Multiple
**Problem:** Find the smallest common multiple of the provided parameters that can be evenly divided by both, as well as by all sequential numbers in the range between these parameters.

The range will be an array of two numbers that will not necessarily be in numerical order.

For example, if given 1 and 3, find the smallest common multiple of both 1 and 3 that is also evenly divisible by all numbers _between_ 1 and 3. The answer here would be 6.

## My Solution
```js
function smallestCommons(arr) {
  arr = arr.sort((a,b)=> b-a);

  var newArr = [];
  for(var i=arr[0];i >= arr[1]; i--) {
    newArr.push(i);
  }

  var match = false;
  var smallestMultiple;
  for(var i=arr[0]+1; match==false;i++) {
    match = newArr.every(function(currentValue) {
      return i % currentValue == 0;
    });
    smallestMultiple = i;
  }
  return smallestMultiple;
}

smallestCommons([1,5]);
```

Footer
---
Source:
Keywords: #javascript 
Related:
- [[JavaScript Intermediate Algorithm Scripting]]