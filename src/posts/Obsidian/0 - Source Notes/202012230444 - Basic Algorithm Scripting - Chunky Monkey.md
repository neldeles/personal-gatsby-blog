# Chunky Monkey
Problem: Write a function that splits an array (first argument) into groups the length of `size` (second argument) and returns them as a two dimensional array.

## My Solution
```js
function chunkArrayInGroups(arr, size) {
  let len = arr.length;
  let outputArr = [];
  let index = 0;
  // create your sub groups in the outer loop
  let numOfGroups = len/size;
  for (var i=0;i<numOfGroups;i++) {
    // push elements up to size in a sub array
    let subArr = [];
    for (var j=0;j<size;j++) {
      if (typeof(arr[index+j])!=='undefined') {
        subArr.push(arr[index + j]);
      } 
    }
    // push sub array into main array
    outputArr.push(subArr);
    // increase interval by size
    index += size
  }
  console.log(outputArr);
  return outputArr;
}

chunkArrayInGroups([0, 1, 2, 3, 4, 5], 4); 
// output: [ [ 0, 1, 2, 3 ], [ 4, 5 ] ]
```

## Elegant Solution #1
```js
function chunkArrayInGroups(arr, size) {
  var newArr = [];
  while (arr.length) {
    newArr.push(arr.splice(0, size));
  }
  return newArr;
}
```
---
Source:
Keywords: #javascript #exercise
Related: