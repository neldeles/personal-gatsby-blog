# Sum All Odd Fibonacci Numbers
**Problem:** Given a positive integer `num`, return the sum of all odd Fibonacci numbers that are less than or equal to `num`.

## My Solution
```js
function sumFibs(num) {
  // generate fibonacci sequence up to num
  var fib = [1,1];
  var fibSum = 0;
  // while sum isn't num, add previous sum to itself
  while((fib[fib.length-1] + fib[fib.length-2]) <= num) {
    fibSum = fib[fib.length-1] + fib[fib.length-2];
    fib.push(fibSum);
  }
  console.log(fib[fib.length-2], fib[fib.length-1]);
  // filter out all odd numbers then sum them
  const sumOfFib = fib.filter(num => (num % 2)==1).reduce((sum, num) => sum + num, 0);
  console.log(sumOfFib);
  return sumOfFib;
}

sumFibs(75025);
```

## Solution
```js
function sumFibs(num) {
  // Perform checks for the validity of the input
  if (num <= 0) return 0;

  // Create an array of fib numbers till num
  const arrFib = [1, 1];
  let nextFib = 0;

  // We put the new Fibonacci numbers to the front so we
  // don't need to calculate the length of the array on each
  // iteration
  while ((nextFib = arrFib[0] + arrFib[1]) <= num) {
    arrFib.unshift(nextFib);
  }

  // We filter the array to get the odd numbers and reduce them to get their sum.
  return arrFib.filter(x => x % 2 != 0).reduce((a, b) => a + b);
}

// test here
sumFibs(4);
```
**Takeaways**
Solution is almost the same as the one I came up with. Primary difference is this one put the latest sum at the front. ==This means you no longer need to calculate the length of the array on each iteration.==

Footer
---
Source:
Keywords: #javascript 
Related:
- [[JavaScript Intermediate Algorithm Scripting]]