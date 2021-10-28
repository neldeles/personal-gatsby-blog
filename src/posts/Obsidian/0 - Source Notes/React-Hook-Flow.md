---
date: '2021-10-25T16:03:08'
tags: react/hooks
title:
published: true
description:
aliases:
references:
zet_id: 20211025T160308
date_modified: 2021-10-25T16:39:02
---

# React Hook Flow

![](CleanShot-2021-10-25-at-16.08.09@2x.png)

Important to note that renders are completed first before the useEffects are ran. If your component has children:
- parent component is started and completed
	- children component is rendered and completed BUT only if child is to be rendered i.e. this nested flow doesn't happen unless component is to be rendered
	- children useEffect (clean up first if needed)
- parent useEffect (clean up first if needed)

## `useEffect`

- the cleanup is called first before the setup
- if you have multiple `useEffect` hooks, they are called in the order they are written
- `useEffect` callback only called if it has no dependency, or if it has a dependency whose value changed

## Diagram

In diagram, it looks something like this:

![](CleanShot-2021-10-25-at-16.24.27.png)

This is an example of a child component being unmounted.
![](CleanShot-2021-10-25-at-16.31.43@2x.png)

Since it's unmounted, you can see the `useEffect` callback cleanups are called.

# Footer

---

## Related

---

## References

- [Understand the React Hook Flow | egghead.io](https://egghead.io/lessons/react-understand-the-react-hook-flow)