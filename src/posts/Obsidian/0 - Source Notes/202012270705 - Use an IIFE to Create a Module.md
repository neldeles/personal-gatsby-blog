# Use an IIFE to Create a Module
For example, grouping two mixins into a module:
```js
function glideMixin(obj) {
  obj.glide = function() {
    console.log("Gliding on the water");
  };
}
function flyMixin(obj) {
  obj.fly = function() {
    console.log("Flying, wooosh!");
  };
}
```
^ This becomes:
```js
let motionModule = (function () {
  return {
    glideMixin: function(obj) {
      obj.glide = function() {
        console.log("Gliding on the water");
      };
    },
    flyMixin: function(obj) {
      obj.fly = function() {
        console.log("Flying, wooosh!");
      };
    }
  }
})(); // The two parentheses cause the function to be immediately invoked

// returns motionModule object
motionModule.glideMixin(duck);
duck.glide();
```
- returns an object `motionModule` with mixin behaviors as `properties` of the object

---
Source:
Keywords: #javascript #oop 
Related: [[202012270702 - Immediately Invoked Function Expression (IIFE)]]