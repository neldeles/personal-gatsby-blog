# Refactor Global Variables Out of Functions
This example mainly deals with: 
> "Don't alter a variable or object - create new variables and objects and return them if need be from a function."

Non-functional Programming:
```js
// The global variable
var bookList = ["The Hound of the Baskervilles", "On The Electrodynamics of Moving Bodies", "Philosophiæ Naturalis Principia Mathematica", "Disquisitiones Arithmeticae"];

function add (bookName) {
  bookList.push(bookName);
  return bookList;
}

var newBookList = add('A Brief History of Time');
```

Applying Functional Programming:
```js
// The global variable
var bookList = ["The Hound of the Baskervilles", "On The Electrodynamics of Moving Bodies", "Philosophiæ Naturalis Principia Mathematica", "Disquisitiones Arithmeticae"];

function add (list, bookName) {
  let newList = [...list];
  newList.push(bookName);
  return newList;
}

var newBookList = add(bookList, 'A Brief History of Time');
```

---
Source:
Keywords: #javascript 
Related: [[JavaScript Functional Programming MOC]]