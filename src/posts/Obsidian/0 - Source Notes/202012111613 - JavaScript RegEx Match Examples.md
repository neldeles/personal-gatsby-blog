# JavaScript RegEx Match Examples
## Match Characters Specified
- use `[]` character set
```js
let regex = /[aeiou]/
```

## Match Single Characters not Specified
- Create a single regex that matches all characters that are not a number or a vowel
```js
let quoteSample = "3 blind mice.";
let myRegex = /[^aeiou0-9]/ig; // Change this line
let result = quoteSample.match(myRegex); // Change this line
```

## Match Characters that Occur One or More Times
- `"aabc"` returns `[aa]`
- `"abac"` returns `[a, a]`
```js
let difficultSpelling = "Mississippi";
let myRegex = /s+/g; // Change this line
let result = difficultSpelling.match(myRegex);
// returns [ 'ss', 'ss' ]
```

## Match Characters that Occur Zero or More Times
- use `*` 
```js
let soccerWord = "gooooooooal!";
let gPhrase = "gut feeling";
let oPhrase = "over the moon";
let goRegex = /go*/; //Matches o zero or more times
soccerWord.match(goRegex); // Returns ["goooooooo"]
gPhrase.match(goRegex); // Returns ["g"]
oPhrase.match(goRegex); // Returns null
```

## Find Characters with Lazy Matching
- Regular expressions are by default [[202012111631 - RegEx Greedy|greedy]]
-  can use the `?` character to change it to **lazy matching**
```js
// Lazy vs Greedy Example
let string = "titanic"
let greedyRegEx = "/t[a-z]*i/"
let lazyRegEx = "/t[a-z]*?i/"
let greedyResult = string.match(greedyRegEx) // ["titani"]
let lazyResult = string.match(lazyRegEx) // ["ti"]
```
- Task: return the HTML tag `<h1>`
```js
let text = "<h1>Winter is coming</h1>";
let myRegex = /<.*?>/; // Change this line
let result = text.match(myRegex);
```

## Match Beginning/End String Patterns
- use `^` outside a [[202012111613 - JavaScript RegEx Match Examples#Match Characters Specified|character set]]
- use `$` at the end of the regex
```js
let firstString = "Ricky is first and can be found.";
let firstRegex = /^Ricky/;
firstRegex.test(firstString);
// Returns true
let notFirst = "You can't find Ricky now.";
firstRegex.test(notFirst);
// Returns false
```
## Match All Letters and Numbers
- use *shorthand character class* `\w`
	- equivalent to `[A-Za-z0-9_]`
- example: count number of alphanumeric characters
```js
let quoteSample = "The five boxing wizards jump quickly.";
let alphabetRegexV2 = /\w/g; // Change this line
let result = quoteSample.match(alphabetRegexV2).length;
```
### Match Everything but Letters and Numbers
- use *shorthand character class* `\W`
	- equivalent to `[^A-Za-z0-9_]`

## Match Whitespace and Non-Whitespace Characters
- for whitespace, *shorthand character class*: `\s` (equivalent to `[^ \r\t\f\n\v]`)
- for non-whitespace, *shorthand characte class*: `\S`

## Specify Upper and Lower Number of Matches
- use quantity specifiers: `a{3,5}h` (`a` appearing between 3 and 5 times)

## Check for All or None
- check for zero or one of the preceding element: `?` (i.e. previous element is optional)

## Positive and Negative Lookahead
- Lookaheads are patterns that tell JavaScript to look-ahead in string to check for patterns further along
	- two kinds of *lookaheads*:
		- positive lookahead
			- make sure element in the search pattern is there, but won't actually match it
			- `(?=...)`
		- negative lookahead
			- make sure element in search pattern is not there
				- rest of pattern is returnd if negative lookahead part is not present
			- `(?!...)`
```js
let quit = "qu";
let noquit = "qt";
let quRegex= /q(?=u)/; // u is required but not matched
let qRegex = /q(?!u)/; // makes sure u is not there
quit.match(quRegex); // Returns ["q"]
noquit.match(qRegex); // Returns ["q"]
```
### Exercise
Match passwords that are greater than 5 characters long, do not begin with numbers, and have two consecutive digits
```js
let pwRegex = /^\D(?=\w{5})(?=\w*\d{2})/
```
## Check for Mixed Grouping of Characters
- use `()`
- i.e. if want `Pumpkin` or `Penguin`: `/P(engu|umpk)in/g`

## Reuse Patterns using Capture Groups
- when patterns you search for occur multiple times in a string, use *capture groups*: `()\1`
	- regex pattern in parenthesis, then backslash + number 
		- incermental for each additional capture group
```js
// match any word that occurs twice separated by a space

let repeatStr = "regex regex";
let repeatRegex = /(\w+)\s\1/;
repeatRegex.test(repeatStr); // Returns true
repeatStr.match(repeatRegex); // Returns ["regex regex", "regex"]
```
### Exercise
Match numbers that are repeated only three times in a string, each separated by a space.
```js
let repeatNum = "42 42 42";
let reRegex = /^(\d+)\s\1\s\1$/; // Change this line
let result = reRegex.test(repeatNum);
```
## Use Capture Groups to Search and Replace
- `.replace(regex, replacement)`
- can also access capture groups in replacement string with dollar signs `$`
	- `"Code Camp".replace(/(\w+)\s(\w+)/, '$2 $1');`
		- Returns "Camp Code"
### Exercise
Write a regex `fixRegex` using three capture groups that will search for each word in the string "one two three". 

Then update the `replaceText` variable to replace "one two three" with the string "three two one" and assign the result to the `result` variable. 

Make sure you are utilizing capture groups in the replacement string using the dollar sign (`$`) syntax.
```js
let str = "one two three";
let fixRegex = /(\w+)\s(\w+)\s(\w+)/; // Change this line
let replaceText = "$3 $2 $1"; // Change this line
let result = str.replace(fixRegex, replaceText);
```

---
Source:
Keywords: #javascript #regex 
Related: [[202012110520 - JavaScript RegEx Match Method]]