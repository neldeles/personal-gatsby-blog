links: [[Javascript MOC]]
# JavaScript Functional Programming
Functional programming is an approach to software development based around the evaluation of functions. Like mathematics, functions in programming map input to output to produce a result. You can combine basic functions in many ways to build more and more complex programs.

Functional programming follows a few core principles:
- Functions are independent from the state of the program or global variables. They only depend on the arguments passed into them to make a calculation
- Functions try to limit any changes to the state of the program and avoid changes to the global objects holding data
- Functions have minimal side effects in the program

The functional programming software development approach breaks a program into small, testable parts.

Functional programming is about:

1. [[202012280523 - Pass Arguments to Avoid External Dependence in a Function|Isolated functions ]]- there is no dependence on the state of the program, which includes global variables that are subject to change

2. Pure functions - the same input always gives the same output

3. Functions with limited side effects - any changes, or mutations, to the state of the program outside the function are carefully controlled
## Some Functional Terminology
- [[202012272057 - JavaScript Callbacks]]
- [[202012272059 - JavaScript First Class Functions]]
- [[202012272101 - JavaScript Higher Order Function]]
- [[202012272103 - JavaScript Lambda]]
- [[202012280515 - Mutations and Side Effects]]
- [[202101020334 - Introduction to Currying and Partial Application]]
```js
// example of the above terminology
// Function that returns a string representing a cup of green tea
const prepareGreenTea = () => 'greenTea';

// Function that returns a string representing a cup of black tea
const prepareBlackTea = () => 'blackTea';

/*
Given a function (representing the tea type) and number of cups needed, the
following function returns an array of strings (each representing a cup of
a specific type of tea).
*/
const getTea = (prepareTea, numOfCups) => {
  const teaCups = [];

  for(let cups = 1; cups <= numOfCups; cups += 1) {
    const teaCup = prepareTea();
    teaCups.push(teaCup);
  }
  return teaCups;
};

// Only change code below this line
const tea4GreenTeamFCC = getTea(prepareGreenTea, 27);
const tea4BlackTeamFCC = getTea(prepareBlackTea, 13);
// Only change code above this line

console.log(
  tea4GreenTeamFCC,
  tea4BlackTeamFCC
);
```
## Creating and Using Non-Mutating Functions
Functional programming is all about creating and using non-mutating functions. Here are some commonly used ones:
- [[202012171705 - `.slice()` function|slice]] instead of [[202012171651 - `.splice()` function|splice]]
- `concat` instead of [[202011201756 - `.push()` function|push]]
- [[202012291730 - Use the filter Method to Extract Data from an Array|filter]]
- [[202012281617 - Use the map Method to Extract Data from an Array|map]]
- [[202012311518 - JavaScript Reduce Method|reduce]]
- Modified [[202101011807 - Sort an Array Alphabetically using the sort Method|sort]]
## Examples of Applying Functional Programming
- [[202012280556 - Refactor Global Variables Out of Functions]]