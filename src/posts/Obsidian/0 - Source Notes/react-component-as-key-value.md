---
date: '2021-11-10T19:49:33'
tags: react,
title:
published: false
description:
aliases:
references: ['https://stackoverflow.com/questions/67973749/using-a-react-component-as-the-value-of-a-key-value-pair-in-a-object-typescr']
zet_id: 20211110T194933
date_modified: 2021-11-10T19:50:42
---

# React component as key value pair

```js
import { CarIcon } from 'components/Icons';

export interface Map {
  [name: string]: string;
}

const Icons: Map = {
  cars: () => <CarIcon altt="f" />,
};

export default Icons;
```

# Footer

---

## Related

---

## References

- https://stackoverflow.com/questions/67973749/using-a-react-component-as-the-value-of-a-key-value-pair-in-a-object-typescr