# Combine Arrays with the Spread Operator
- ability to combine arrays or to insert all the elements of one array into another, at any index

```js
let thisArray = ['sage', 'rosemary', 'parsley', 'thyme'];

let thatArray = ['basil', 'cilantro', ...thisArray, 'coriander'];
// thatArray now equals ['basil', 'cilantro', 'sage', 'rosemary', 'parsley', 'thyme', 'coriander']
```

---
Source:
Keywords: #javascript #es6 
Related: [[202011300451 - JavaScript Spread Operator]]
, [[202012171642 - JavaScript Arrays]]