# Use Recursion to Create a Countdown 
Return an array containing numbers `1` through `n`.

## Wrong Way (My Attempt)
```js
cd_arr = []
function countdown(N) {
	if (N == 1) {
		cd_arr.push(1);
	} else if {
		cd_arr.push(N);
		countdown(N-1);
	}
}
```

## Right Way (FCC Answer)
```js
function countup(n) {
  if (n < 1) {
    return [];
  } else {
    const countArray = countup(n - 1);
    countArray.push(n);
    return countArray;
  }
}
console.log(countup(5)); // [ 1, 2, 3, 4, 5 ]
```

## Reflection on What Went Wrong vs Right
The flow I had in my head is that:
	- push into the array, calls itself, if N !== 1, push into the array etc.
What I understood wrong is the recursive functions build bottom up (aka base case up). In the `Wrong Way`, I was still executing the recursive call as a last step before it would loop over again. 

In the `Right Way`, all the [[202011251704 - Recursive Case|recursive calls]] finish executing first, and then the `push` happens last. So your execution states are first built for each recursive call i.e. if `n=5`, it starts from 5 but decomposes to *execution state n=0, execution state n=1....execution state n=5*. Then for execution state: 
- n=0, array built -> []
- n=1, pushed -> [1]
- n=2, pushed -> [1,2]
	
To quote FCC: 
> "At the point where n is pushed into the array, `countup(n - 1)` has already been evaluated and returned `[1, 2, ..., n - 1]`"

---
Source:
Keywords: #programming #javascript 
Related: [[202011251635 - Recursion]]