---
date: '2021-11-11T17:53:11'
tags: react, useCallback
title:
published: false
description:
aliases:
references: ['https://stackoverflow.com/questions/62762104/react-input-lose-focus-when-typing']
zet_id: 20211111T175311
date_modified: 2021-11-11T18:06:37
---

# Inline components in React

Had a scenario wherein it made more sense to place the React functional component nested within a component, to avoid less prop drilling.

But this led to this nested component being recreated whenever the parent component re-renders.

Solution is to use `useCallback`.

```tsx
export function Input({
  name,
  type = "text",
  id = name,
  label,
  placeholder,
  disabled = false,
  onChange,
}: TInputProps) {
  const InputField = useCallback(
    () => (
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className={classNames(
          // container
          "block py-2 px-3 w-full rounded-md border border-gray-300 shadow-sm appearance-none",
          // text
          "sm:text-sm placeholder-gray-400 disabled:text-gray-300",
          "focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
        )}
        disabled={disabled}
        onChange={onChange}
      />
    ),
    []
  );

  if (label) {
    return (
      <div>
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <div className="mt-1">
          <InputField />
        </div>
      </div>
    );
  }
  return <InputField />;
}
```

# Footer

---

## Related

---

## References

- https://stackoverflow.com/questions/62762104/react-input-lose-focus-when-typing