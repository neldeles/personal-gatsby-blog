---
date: '2021-06-26T13:51:55'
tags: ['javascript', 'watchandcode']
title: 
published: true
description:
aliases:
references: ['https://watchandcode.com/courses/350615/lectures/13676211']
---

# How Primitives and Objects are stored in Javascript
![[CleanShot 2021-06-26 at 13.52.35.png]]

Javascript creates the object with a memory address, and that memory address is what's stored in the `myObject` variable.


## Example 1
Here's another example. What does `myHouse.color` evaluate to?
![[CleanShot 2021-06-26 at 14.01.19.png]]

The answer is `blue`. In line 2, `myHouse.color` returns the primitive value (color blue) and that is what's assigned to `color`. We then re-assign `color` to `red`. This is how a computer thinks and is part of our training ourselves to think like a computer.

## Example 2
![[CleanShot 2021-06-26 at 14.06.20.png]]
What does `myHouse1.color` and `myHouse2.color` evaluate to?

![[CleanShot 2021-06-26 at 14.07.30.png]]
Answer is `red` for both because they store the same memory address, so change in the object reflects for both variables.

## Example 3
![[CleanShot 2021-06-26 at 14.09.22.png]]
What does `myHouse1.color` and `myHouse2.color` evaluate to?

![[CleanShot 2021-06-26 at 14.11.34.png]]
Answer is `blue` for `myHouse1` and `red` for `myHouse2`.

# Footer
---
Related: 