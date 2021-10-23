---
date: '2021-10-21T17:48:19'
tags: ['storybook', 'jest', 'testing']
title: Unit testing with Storybook and Jest 
published: true
description:
aliases:
references: ['https://storybook.js.org/docs/react/workflows/unit-testing']
zet_id: 20211021T174819
---

{title}

```js
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

//👇 Imports a specific story for the test
import {
  InputOnly,
  InputWithLabel,
  InputWithPlaceholder,
} from "./Input.stories";

test("renders an input field only", () => {
  render(<InputOnly {...InputOnly.args} />);
  expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
});

test('renders an input field with a label "Test Label"', () => {
  render(<InputWithLabel {...InputWithLabel.args} />);
  const label = InputWithLabel.args.label;
  const input = screen.getByLabelText(label);
  expect(input).toHaveAttribute("type", "text");
});

test('renders an input field with placeholder text "Placeholder Text"', () => {
  render(<InputWithPlaceholder {...InputWithPlaceholder.args} />);
  const placeholder = InputWithPlaceholder.args.placeholder;
  const input = screen.getByRole("textbox");
  expect(input).toHaveAttribute("placeholder", placeholder);
});
``` 

# Footer

---
## Related

---

## References

- https://storybook.js.org/docs/react/workflows/unit-testing