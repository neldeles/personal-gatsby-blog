---
date: '2021-06-23T19:27:42'
tags: ['vim']
title: 
published: true
description:
aliases:
references: ['https://stackoverflow.com/questions/2946051/changing-case-in-vim']
---

# Uppercase a word
Use  `gU<motion>` i.e. `gUiw`.

```
 ~    : Changes the case of current character

 guu  : Change current line from upper to lower.

 gUU  : Change current LINE from lower to upper.

 guw  : Change to end of current WORD from upper to lower.

 guaw : Change all of current WORD to lower.

 gUw  : Change to end of current WORD from lower to upper.

 gUaw : Change all of current WORD to upper.

 g~~  : Invert case to entire line

 g~w  : Invert case to current WORD

 guG  : Change to lowercase until the end of document.

 gU)  : Change until end of sentence to upper case

 gu}  : Change to end of paragraph to lower case

 gU5j : Change 5 lines below to upper case

 gu3k : Change 3 lines above to lower case
```

# Footer
---
Related: 