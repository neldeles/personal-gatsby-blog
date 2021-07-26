---
date: '2021-07-09T14:39:24'
tags: ['testing']
title: 
published: true
description:
aliases:
references: ['https://kentcdodds.com/blog/testing-implementation-details']
---

# Importance of implementation details
## What are implementation details?
> Implementation details are things which users of your code will not typically use, see, or even know about.

Here are some guidelines to help us identify implementation details.

- Who is the user of this code? React components typically have two users: end-users and developers
- What parts of our code do each of these users use, see, and know about?
	- end user will see/interact with what we render in the `render` method
	- developer will see/interact with the props they pass to the component


# Footer
---
Related: 