# Use Recursion to Create a Range of Numbers

## My Solution (Works but wrong)
```js
function rangeOfNumbers(startNum, endNum) {
  if (startNum > endNum) {
    return [];
  } else if (startNum == endNum) {
    return [startNum];
  } else {
    const numArray = rangeOfNumbers(startNum+1, endNum-1);
    numArray.push(endNum);
    numArray.unshift(startNum);
    return numArray;
  }
};
```

## Correct Solutions 
```js
function rangeOfNumbers(startNum, endNum) {
  if (endNum - startNum === 0) {
    return [startNum];
  } else {
    var numbers = rangeOfNumbers(startNum, endNum - 1);
    numbers.push(endNum);
    return numbers;
  }
}
```
### Using [[202011271515 - Conditional (Ternary) Operator|Conditional Operator]]
```js
function rangeOfNumbers(startNum, endNum) {
  return startNum === endNum
    ? [startNum]
    : rangeOfNumbers(startNum, endNum - 1).concat(endNum);
}
```
## Where I Went Wrong
Just needed to decrement `endNum` and that would've eliminated the need for the `else if` in my answer.

---
Source:
Keywords: #programming #javascript 
Related: [[202011251635 - Recursion]], [[JavaScript Recurcsion Exercise 1]]