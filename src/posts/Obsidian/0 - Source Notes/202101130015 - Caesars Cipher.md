# Caesars Cipher
**Problem:** One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher. In a shift cipher the meanings of the letters are shifted by some set amount.

A common modern use is the [ROT13](https://en.wikipedia.org/wiki/ROT13) cipher, where the values of the letters are shifted by 13 places. Thus 'A' ↔ 'N', 'B' ↔ 'O' and so on.

Write a function which takes a [ROT13](https://en.wikipedia.org/wiki/ROT13) encoded string as input and returns a decoded string.

All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.

## My Solution
```js
function rot13(str) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
  const alph = {};
  for(var i=0;i<alphabet.length;i++) {
    alph[alphabet[i]] = i;
  }
  var arr = str.split('');
  var newArr = arr.map(
    function(char) {
      // check if alphabetic character
      if(/[A-Z]/.test(char)) {
        if(alph[char]+13<26) {
          return alphabet[alph[char]+13];
        } else {
          return alphabet[alph[char]+13-26]
        }
      }
      return char;
    }
  )
  console.log(newArr.join(''));
  return newArr.join('');
}

rot13("SERR PBQR PNZC"); // FREE CODE CAMP
```

## Solution
```js
function rot13(str) {
  // LBH QVQ VG!
  return str.replace(/[A-Z]/g, L =>
    String.fromCharCode((L.charCodeAt(0) % 26) + 65)
  );
}
```
Using modulo operator, one can map a range of values to a range between [`0` to `DIVISOR - 1`].

```
0 ⇔ 0
1 ⇔ 1
2 ⇔ 2
3 ⇔ 3
4 ⇔ 4
5 ⇔ 0
6 ⇔ 1
7 ⇔ 2
8 ⇔ 3
9 ⇔ 4
10 ⇔ 0
```
Here we can see that for divisor of 5, range is from 0-4. Applying this to the ASCII representation, we get:
```
	[A]  65 % 26 ⇔ 13 + 65 =  78 [N]
    [B]  66 % 26 ⇔ 14 + 65 =  79 [O]
    [C]  67 % 26 ⇔ 15 + 65 =  80 [P]
    [D]  68 % 26 ⇔ 16 + 65 =  81 [Q]
    [E]  69 % 26 ⇔ 17 + 65 =  82 [R]
    [F]  70 % 26 ⇔ 18 + 65 =  83 [S]
    [G]  71 % 26 ⇔ 19 + 65 =  84 [T]
    [H]  72 % 26 ⇔ 20 + 65 =  85 [U]
    [I]  73 % 26 ⇔ 21 + 65 =  86 [V]
    [J]  74 % 26 ⇔ 22 + 65 =  87 [W]
    [K]  75 % 26 ⇔ 23 + 65 =  88 [X]
    [L]  76 % 26 ⇔ 24 + 65 =  89 [Y]
    [M]  77 % 26 ⇔ 25 + 65 =  90 [Z]
    [N]  78 % 26 ⇔  0 + 65 =  65 [A]
    [O]  79 % 26 ⇔  1 + 65 =  66 [B]
    [P]  80 % 26 ⇔  2 + 65 =  67 [C]
    [Q]  81 % 26 ⇔  3 + 65 =  68 [D]
    [R]  82 % 26 ⇔  4 + 65 =  69 [E]
    [S]  83 % 26 ⇔  5 + 65 =  70 [F]
    [T]  84 % 26 ⇔  6 + 65 =  71 [G]
    [U]  85 % 26 ⇔  7 + 65 =  72 [H]
    [V]  86 % 26 ⇔  8 + 65 =  73 [I]
    [W]  87 % 26 ⇔  9 + 65 =  74 [J]
    [X]  88 % 26 ⇔ 10 + 65 =  75 [K]
    [Y]  89 % 26 ⇔ 11 + 65 =  76 [L]
    [Z]  90 % 26 ⇔ 12 + 65 =  77 [M]
```
The modulo remainder acts as our offset.

Footer
---
Source:
Keywords: #javascript 
Related:
- [[JavaScript Intermediate Algorithm Scripting]]