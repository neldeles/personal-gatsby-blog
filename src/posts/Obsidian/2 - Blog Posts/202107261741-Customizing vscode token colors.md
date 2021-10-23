---
date: '2021-07-26T17:41:47'
tags: vscode, 
title: Customizing VSCode Token Colors
published: true
description:
aliases:
references:
---

![](./_images/CleanShot-2021-07-26-at-17.43.13@2x.png)

In VSCode, open command palette and search for "Inspect Editor Tokens and Scopes". This will allow you to identify which scopes you want to modify.

For example, I want to modify the `const` keyword. 

![](./_images/CleanShot-2021-07-26-at-17.45.17@2x.png)

I now know that one way to modify it is to use its scope `storage.type.js`. So go to your *settings.json*,  then under `"editor.tokenColorCustomizations"`, add it in. In my case, I want it modifed on a per theme basis, so I create an object for that theme.

![](./_images/CleanShot-2021-07-26-at-17.46.47@2x.png)


---
Related: 