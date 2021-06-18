# `toJSON` method of Mongoose schema
Used on all instances of the models produced with that schema. Modifying the method works like this:

```js
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
```


Footer
---
Source:
Keywords: #mongodb #mongoose 
Related:
- [[MongoDB Setup for Node]]