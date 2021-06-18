# Use getters and setters to Control Access to an Object
- obtaining values from an object and setting the value of a property within an object
	- classically called [[202012041649 - Getter Function|getters]] and [[202012041649 - Setter Function|setters]]
	- Getters and setters are important because they hide internal implementation details. 
		- It is convention to precede the name of a private variable with an underscore (`_`). However, the practice itself does not make a variable private.

```js
class Book {
  constructor(author) {
    this._author = author;
  }
  // getter
  get writer() {
    return this._author;
  }
  // setter
  set writer(updatedAuthor) {
    this._author = updatedAuthor;
  }
}
const novel = new Book('anonymous');
console.log(novel.writer);  // anonymous
novel.writer = 'newAuthor';
console.log(novel.writer);  // newAuthor
```

---
Source:
Keywords: #javascript #es6
Related: [[202012041649 - Getter Function]], [[202012041649 - Setter Function]]