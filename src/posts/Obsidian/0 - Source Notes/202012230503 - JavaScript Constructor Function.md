# Defining a Constructor Function
```js
function Bird() {
  this.name = "Albert";
  this.color = "blue";
  this.numLegs = 2;
}
```

- *Constructors* are functions that create new objects
	- define properties and behaviors that will belong to the new object
	- blueprints for the creation of new objects
#### Constructor Conventions
- defined with a capitalized name to distinguish from non-constructor functions
- constructors use the word `this` to set properties of the object they will create
- define properties and behaviors; NOT returning values as other functions might

## Use a Constructor to Create Objects
```js
let blueBird = new Bird();

blueBird.name; // => Albert
blueBird.color; // => blue
blueBird.numLegs; // => 2

// can modify property value as well
blueBird.name = 'Elvira';
blueBird.name; // => Elvira
```
### Extend Constructors to Receive Arguments
- design your constructor to accept parametrs:
```js
function Bird(name, color) {
  this.name = name;
  this.color = color;
  this.numLegs = 2;
}
```


---
Source:
Keywords: #javascript #oop 
Related: 
- [[JavaScript Object Oriented Programming MOC]]
- [[202012230522 - instanceof]]
- [[202012230530 - Use Prototype Properties to Reduce Duplicate Code]]
- [[202012041635 - Use class Syntax to Define a Constructor Function]]