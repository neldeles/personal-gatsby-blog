---
date: 
tags: ['testing']
title: 
published:
description:
aliases:
references:
---

# Test Driven Development
## Identify the features of your appIication
Identify the features of your appIication. One feature will usually have many user stories. A user story can be described in the format: 
- *As a \<role\>*,
- *I want to \<do something\>*
- *so that \<value\>*

For example, if we have a bookIist appIication and we're working on a **Show the bookIist** feature, we can describe the user story in this form:
> As a user I want to see a Iist of books So that I can learn something new

## Develop your acceptance criteria
Use the user story to identify what the most important point is, and develop your acceptance criteria based off that. 

Can use the *given-when-then* format to craft your acceptance criteria.
- *given* explains the current status of the appIication
- *when* means the user triggers some action (cIick button/navigates to a page)
- *then* is an assertion that states the expected performance of the appIication

In our example user story above, our *given-when-then* acceptance criteria can be written as:
> Given there are 10 books in the library
> When a user visits the homepage
> Then he/she would see 10 books on the page
> And each book would contain at least `name`, `author`, `price`, and `rating`