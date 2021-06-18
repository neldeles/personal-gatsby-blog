---
aliases:
tags: ['vim', 'vscode']
references:
---

# VSCode Vim Bindings

## terminal <----> editor
To jump from the editor to the terminal using #vscode bindings it's `` CTRL + ` ``.

To jump **from** the terminal to the editor, I've mapped `CTRL + k` to focus on the last editor in my *keybindings.json* file.

## Custom keybindings
- changed navigation of vscode windows to `ctrl + hjkl` instead of `ctrl + w, hjkl`
- remapped join to `leader + j`
- navigate by 10 lines with `shift + j/k`
- [insert space above/below current line without going into insert mode](https://github.com/VSCodeVim/Vim/issues/1396): `leader + o/O`
- undo and redo was getting messed up. Remapped `u` and `ctrl + r` to vscode undo and redo

# Footer
---
Related: 