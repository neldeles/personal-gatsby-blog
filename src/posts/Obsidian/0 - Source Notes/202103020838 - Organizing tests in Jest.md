# Organizing tests in Jest
I’ve seen two popular ways suggested for organizing tests in Jest:

1.  Putting all of your test code into a neatly organized `/tests` directory.
2.  Putting your test code next to the files they are testing.

Both of these suggestions are valid, but to have the elegance of a master craftsman, we should consider the level of the test that is being written.

## Testing Levels
There are many testing levels, but for simplicity we’re just going to talk about two here.

> “**Unit testing** refers to tests that verify the functionality of a specific section of code, usually at the function level. In an object-oriented environment, this is usually at the class”
> 
> “**Integration testing** is any type of software testing that seeks to verify the interfaces between components against a software design.”
> 
> from [Wikipedia: Software Testing](https://en.wikipedia.org/wiki/Software_testing#Integration_testing)

## Where to put test files
_Unit tests_ run against _specific_ lines of code. So it makes sense to place them right next to that code.

```
|- /main  
|  |- index.js  
|  |- index.test.js
```

_Integration tests_ run against _many_ lines of code in _many_ files. There is no single place that would make sense, so it’s best to have them in a `/tests` directory.

```
|- /main  
|  |- index.js  
|- /supporting  
|  |- fetch.js  
|- /tests  
|  |- /int  
|  |  |- api.test.js
```

## How to name test files
Naming every level of test `*.test.js` doesn’t make much sense. So include the type of test right in the name of the file.

Example:`index.unit.test.js` and `api.int.test.js`

That way it’s easy to find your tests. And with Jest’s pattern matching feature, it makes it simple to run them separately as well. For unit testing run `jest unit` and for integration testing run `jest int`.

Footer
---
Source: https://medium.com/@JeffLombardJr/organizing-tests-in-jest-17fc431ff850
Keywords: #jest #testing 
Related:
- [[Theory MOC]]