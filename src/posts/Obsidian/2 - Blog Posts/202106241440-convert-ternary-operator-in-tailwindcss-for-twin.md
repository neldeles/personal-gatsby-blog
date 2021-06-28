---
date: '2021-06-24T14:41:24'
tags: ['tailwindcss', 'twin']
title: Convert ternary operator in TailwindCSS for Twin.macro
published: true
description: Translating conditional rendering from Tailwind to Twin.
aliases:
references:
---

In TailwindUI, this is often used in the components: 

```js
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

classNames={classNames(
	item.current
	? 'bg-gray-100 text-gray-900'
	: 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
	'group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md'
)}
```

It's actually much simpler to do this in Twin:
```js
css={[
	tw`w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md`,
	!item.current &&
	tw`bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900`,
	item.current && tw`bg-gray-100 text-gray-900`,
]}
```

I'm using the `css` prop of emotion here, then just using Twin's implementation of conditional rendering. The first line is your base css that is common across all conditions.

# Footer
---
Related: 