---
aliases:
tags: ['tailwind', 'twin', 'styled-components', 'react']
references:
- 'https://dev.to/jaredcwhite/why-tailwind-isn-t-for-me-5c90'
- 'https://mxstbr.com/thoughts/css-in-js/'
- 'https://mxstbr.com/thoughts/tailwind/'
---

# Tailwind + Twin + styled-components + CRA
Trying to structure my workflow for building web apps with components around these libraries/frameworks.

Biggest hurdle for me was trying to understand the overlaps and responsibilities of each, and why use them together to begin with.

Let's start with Tailwind and `styled-components`. These 2 are pitted each other often. But it isn't a zero-sum game. Both can co-exist. Tailwind is an atomic CSS framework. As [Max Stoiber](https://mxstbr.com/thoughts/tailwind/) so eloquently put it:

> **The key to Tailwind's popularity is the painstakingly constructed system of design tokens at the core of the framework.**

Simplified, it's just a pre-defined set of utility-based classes that allow us to be consistent within and across our projects. `<p tw="text-gray-600">(555) 765-4321</p>` is the same shade of gray in Project A, B , C....Z (assuming you don't change the default values).

`styled-components` on the other hand **isn't** an atomic CSS framework. It is one of the most popular CSS-in-JSS approaches. Their [website](https://styled-components.com/) succintly describes it:

> styled-components lets you write actual CSS in your JavaScript. This means you can use all the features of CSS you use and love, including (but by far not limited to) media queries, all pseudo-selectors, nesting, etc.

It gives you superpowers to be normal in a new world e.g. write old school css in React. Unlike Tailwind, it doesn't provide you with design tokens. 

Now that we know the difference in their philosophy, we can better understand why they can co-exist. They do not really overlap ergo we can use Tailwind's design tokens in a CSS-in-JS approach...through the magic of Twin. From Twin's [github page](https://github.com/ben-rogerson/twin.macro):

> Twin blends the magic of Tailwind with the flexibility of css-in-js (emotion, styled-components and goober) at build time.

Paraphrasing the earlier `styled-components` excerpt:

> Twin lets you write actual ~~CSS~~ TailwindCSS in your JavaScript. This means you can use all the features of ~~CSS~~ TailwindCSS and `styled-components` you use and love, including (but by far not limited to) ~~media queries, all pseudo-selectors, nesting, etc.~~ Tailwind's design tokens and styled-component's [confidence, painless maintenance, enchanced teamwork, fast performance, and dynamic styling](https://mxstbr.com/thoughts/css-in-js/), etc.

Aside from being able to leverage each framework's strengths, using them together also solves much of the arguments against Tailwind. 

For example, one reason people don't like Tailwind is the [ugly-ass HTML](https://dev.to/jaredcwhite/why-tailwind-isn-t-for-me-5c90). But you can rewrite that as a Styled Component—bypassing the use of  `@apply` altogether.


# Footer
---
Related: 