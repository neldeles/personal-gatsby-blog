---
date: '2021-11-04T09:03:54'
tags: typescript, react,
title:
published: false
description:
aliases:
references:
zet_id: 20211104T090354
date_modified: 2021-11-04T16:17:47
---

# Typescript and React

You may come across tutorials that use the generic `React.FC`. The TLDR is to [never use that](https://kentcdodds.com/blog/how-to-write-a-react-component-in-typescript#:~:text=This%20works%20pretty%20well%2C%20but%20there%20are%20three%20major%20problems%20with%20this%3A) and instead jsut write it "normally":

```ts
import React from "react";

type Person = {
  firstName: string;
  lastName: string;
}

type TextFieldProps = {
  text: string;
  ok?: boolean;
  i?: number;
  fn?: (bob: string) => string;
  person: Person;
}

// wrong
// export const TextField: React.FC<TextFieldProps> = () => {
export function TextField(props : TextFieldProps) {
  return (
    <div>
      <input type="text" />
    </div>
  );
};
```

### interface vs type

For React props and state it's [recommended](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example#types-or-interfaces) to use *type aliases*.

Interfaces are good if you're making a 3rd-party API or library. Layman's explanation can be found [here](hook://file/5HzmeNQ6D?p=T25lRHJpdmUvZUJvb2tz&n=typescript%2Din%2D50%2Dlessons%2Epdf#p=120&x=0&y=0&s=219&e=917).

### Hooks

You can set the types a hook accepts with `<>`:

```tsx
export const TextField: React.FC<TextFieldProps> = () => {
  const [count, setCount] = useState<number | null | undefined>(5)
  // you can use

  setCount('dog')

  return (
    <div>
      <input type="text" />
    </div>
  );
};
```

# Footer

---

## Related

---

## References