# Preventing Data Mutation
- use the `Object.freeze` function
	- once the object is frozen, you can no longer add, update, or delete properties from it. Any attempt at changing the object will be rejected without an error
```js
let obj = {
  name:"FreeCodeCamp",
  review:"Awesome"
};
Object.freeze(obj);
obj.review = "bad"; // will be ignored. Mutation not allowed
obj.newProp = "Test"; // will be ignored. Mutation not allowed
console.log(obj); 
// { name: "FreeCodeCamp", review:"Awesome"}
```

## deep-freeze library
Can also automate it by using the library [deep-](https://github.com/substack/deep-freeze). It recursively applies the `Object.freeze` function.

You can install it in your project as a dev dependency:
```js
npm install --save-dev deep-freeze
```

# Footer
---
Source:
Keywords: #javascript #programming 
Related: [[202011300410 - const keyword]]