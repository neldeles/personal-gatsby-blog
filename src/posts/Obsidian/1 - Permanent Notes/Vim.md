---
aliases:
- 'vim'
tags: ['vim']
references:
---

# Vim
## word by word
`word` is letters, digits, and numbers
- `w` to move word by word
- `b` to move backward word by word
- `e` end of a word
- `ge`end of the previous word
## WORD by WORD
`WORD` is letters, digits, numbers and non-blank characters
- `W` to move WORD by WORD
- `B` to move backward WORD by WORD
- `E` end of a WORD
- `gE` end of previous WORD


## Text objects
- use `ciw` over `cw` because for `ciw` your cursor can be in any part of the word
	- with `cw` cursor has to be at the start of the word for it to work
	- `ciw` is therefore much more repeatable
- Text objects with quotes `"`, `'` and backtick are special. They have a forward seeking behavior so that **you don't even need to be on top of the text object itself**.


## Usecases Encountered
These are some of the use cases I've encountered so far:
- [[202103211507 - Yank multiple words]]
- [[202103212054 - Delete n lines above]]
- [[202103230332 - Wrap tags around block]]
- [[202103230338 - Indent multiple lines quickly]]
- [[202103231709 - Select function definition]]


# Footer
---
Related: 