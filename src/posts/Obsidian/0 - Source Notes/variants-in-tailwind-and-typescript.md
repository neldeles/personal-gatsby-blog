---
date: '2021-11-01T08:22:11'
tags: tailwind, typescript
title:
published: false
description:
aliases:
references:
zet_id: 20211101T082211
date_modified: 2021-11-01T08:32:53
---

# Variants in Tailwind and Typescript

There are 2 options. The first takes advantage of index accessor to return a union of value types:

```tsx
import { classNames } from "util/classNames";

const variants = ["primary", "secondary", "success", "danger"] as const;

// index accessor to return union of value types
type Variant = typeof variants[number];

const variantMaps: Record<Variant, string> = /*tw*/ {
  primary: "text-white bg-indigo-600 border-transparent hover:bg-indigo-700",
  secondary: "text-gray-700 bg-white border-gray-300 hover:text-gray-500",
  success: "text-white bg-green-600 hover:bg-green-700 focus:ring-green-500",
  danger: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500",
};

export type ButtonProps = {
  variant: Variant;
};

export function Button({
  variant = "primary",
}: ButtonProps) {
	// some code here
}
```

The second option uses [constrained-identity-function](constrained-identity-function.md). 

```tsx
import { classNames } from "util/classNames";

const createVariants = <T extends Record<string, string>>(obj: T) => obj

const variantMaps = createVariants({
  primary: "text-white bg-indigo-600 border-transparent hover:bg-indigo-700",
  secondary: "text-gray-700 bg-white border-gray-300 hover:text-gray-500",
  success: "text-white bg-green-600 hover:bg-green-700 focus:ring-green-500",
  danger: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500",
});

export type ButtonProps = {
  variant: keyof typeof variantMaps;
};

export function Button({
  variant = "primary",
}: ButtonProps) {
	// some code here
}
```

## Pros and Cons

At first glance, CIF seems better because you only have to edit one place if you want to add/remove `keys`. But in terms of ease of maintenance, I'd say the first option is better because there is no cleverness to it. Our `keys` aren't dynamically generated, so it's easier to reason about the code.

# Footer

---

## Related

---

## References

- https://blog.logrocket.com/tailwind-css-tips-for-creating-reusable-react-components/