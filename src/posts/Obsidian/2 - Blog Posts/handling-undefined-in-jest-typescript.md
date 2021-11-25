---
date: '2021-11-10T08:06:13'
tags: jest, testing, typescript,
title: Handling `undefined` in Jest and Typescript
published: true
description:
aliases:
references: ['https://youtu.be/-p4RXvG9x-U?t=1632']
zet_id: 20211110T080613
date_modified: 2021-11-25T14:27:40
---

# Handling `undefined` in Jest and Typescript

You may come across the following error `Argument of type x | undefined is not assignable to parameter of type undefined` in your Jest tests. Kent Dodds resolves this with a type guard.

```tsx
test("renders an input text field with a label", () => {
  // need "as" because of https://github.com/storybookjs/storybook/issues/13747
  const args = InputWithLabel.args as TInputProps;
  render(<InputWithLabel {...args} />);
  if (!args.label) {
    throw new Error("🚨 Make sure label args in story is defined.");
  }
  const label = args.label;
  const input = screen.getByLabelText(label);
  expect(input).toHaveAttribute("type", "text");
});
```

# Footer

---

## Related

---

## References

- https://youtu.be/-p4RXvG9x-U?t=1632