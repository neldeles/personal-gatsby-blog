---
date: 2021-06-05
tags: ["projects"]
title: "Budget App"
published: true
description: Blog post on project to follow.
---

New tools I've discovered or learned while building this project:

- [react-table](https://react-table.tanstack.com/)
- [react-datetime](https://github.com/arqex/react-datetime)
- [reselect library](https://redux.js.org/tutorials/fundamentals/part-7-standard-patterns#memoized-selectors)

## Reselect Library

Allows me to generate memoized selector functions for use with Redux

## Key Learnings while working on the `budget-table` branch

On this branch, I focused on the following:

- react-datetime to build out the date picker
- react-table to build out the table
- defining the Modal forms for creating a category group

For the date picker, I learned how to build a custom themed date Month-Year date picker.

For react-table, I learned how to build a custom themed table, the design pattern of lifting up state, and [[202106211913 - workaround for passing a Table ID of the child to a custom button defined in the `Column.Header` options of the parent]]. I also had to apply the *Reselect* library and use of Memoization here.

For defining the Modal, it was another application of lifting up state.
