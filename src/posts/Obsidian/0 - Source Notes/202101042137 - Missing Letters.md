# Missing Letters
**Problem:** Find the missing letter in the passed letter range and return it. If all letters are present in the range, return `undefined`.

## My Solution
```js
function fearNotLetter(str) {
  // generate arr of letters from start to end of str
  let letters = str.split('');
  let ascii = letters.map(letter => letter.charCodeAt(0));
  console.log(ascii);
  // loop through unicode, check if successive is +1
  for(var i=0; i<ascii.length-1;i++) {
    if(ascii[i+1] - ascii[i] !==1){
      console.log('current:',ascii[i]);
      console.log('next:', ascii[i+1]);
      return String.fromCharCode(ascii[i]+1);
    }
  }
  return undefined;
}

fearNotLetter("abce");
```
### Variant on my Solution
```js
function fearNotLetter(str) {
  for (let i = 1; i < str.length; ++i) {
    if (str.charCodeAt(i) - str.charCodeAt(i - 1) > 1) {
      return String.fromCharCode(str.charCodeAt(i - 1) + 1);
    }
  }
}

```
Takeaways:
- rather than exclude the last element, start your index from `1` then look at previous element (vs what I did of looking at the next element)

## Solution
```js
// Adding this solution for the sake of avoiding using 'for' and 'while' loops.
// See the explanation for reference as to why. It's worth the effort.

function fearNotLetter(str) {
  var compare = str.charCodeAt(0),
    missing;

  str.split("").map(function(letter, index) {
    if (str.charCodeAt(index) == compare) {
      ++compare;
    } else {
      missing = String.fromCharCode(compare);
    }
  });

  return missing;
}

// test here
fearNotLetter("abce");
```
**Code Explanation**
- First we define variables to store the character code for the first letter in the string, and to store whatever missing letters we may find.
- We turn the string to an array in order to map through it instead of using `for` and `while` loops.
- As we `map` through our letters’ character codes, we go comparing with the one that should be in that position.
- If the current letter matches, we move the comparison variable to its next position so we can compare on the next cycle.
- If not, the missing letter will be assigned to the `missing` variable, which will be returned after the map is finished.
- If there are no missing characters, return `undefined`.

Footer
---
Source:
Keywords: #javascript 
Related:
- [[JavaScript Intermediate Algorithm Scripting]]