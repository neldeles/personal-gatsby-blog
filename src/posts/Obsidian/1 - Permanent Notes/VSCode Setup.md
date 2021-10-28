# VSCode Setup

**VSCode Config**
- set keyboard shortcut to run in Python Interactive Window as ctrl+alt+p 
- set keyboard shortcut to run up to current line in Python Interactive Window as `ctrl+alt+l`
- Settings Sync (https://itnext.io/settings-sync-with-vs-code-c3d4f126989) 
install black in data env (https://medium.com/@marcobelo/setting-up-python-black-on-visual-studio-code-5318eba4cd00) 
- set italic to work for any theme:  
	- https://www.reddit.com/r/vscode/comments/8gxoer/italic_for_vs_code_with_fira_code_or_operator_mono/ 
	- https://stackoverflow.com/questions/41320848/how-do-i-get-visual-studio-code-to-display-italic-fonts-in-formatted-code (in case above gets taken down. User posted answer here as well) 
* Center Editor Window extension to jump back to cursor. Shortcut is `ctrl + L`
* Numbered Bookmarks to jump between sections in code
* cycle between Editor Groups: `ctrl+cmd+alt+tab`
* set python interactive window to reload external files automatically via `'%load_ext autoreload\n%autoreload 2'` source: [python - How to make VSCode auto-reload external *.py modules? - Stack Overflow](https://stackoverflow.com/questions/56059651/how-to-make-vscode-auto-reload-external-py-modules)
* `cmd+alt+left/right` to navigate next/previous tabs
* install pylance and set as the language server
* installed VSCode-todoist extension for todoist integration
	* installed Highlight extension to highlight todo comments. Can then use todoist extension to hyperlink  to these todos.
		* Highlight extension has regexp for the ff keywords:
			* todo
			* idea
			* optimize/review/tsc
			* ugly/fixme/fix/bug/debug/hack
	* installed Todo+
		* todoist url is broken. to workaround this, installed Todo+ which generates a link to the Todos. I then just create my todoist tasks from the embedded todos
* uninstalled bracket pair colorizer and installed bracket pair colorizer 2 instead
	* edited settings so the colors of the brackets change depending on light/dark theme
```
"workbench.colorCustomizations": {
        "[Alabaster]": {
            // Bracket Pair Colorizer overrides.
            "colorizer.color-1": "#ff9900", // Orange-Brown...
            "colorizer.color-2": "#f500f5", // Medium-Pink...
            "colorizer.color-3": "#54b9f8", // Medium-Blue...
        },
        // Fallback to default colors for all themes that lack overrides.
        "colorizer.color-1": "#ffd700", // "Gold". (Yellow with slight Orange)
        "colorizer.color-2": "#da70d6", // "Orchid". (Pink) 
        "colorizer.color-3": "#87cefa", // "LightSkyBlue". (Light Blue)
    },
    "bracket-pair-colorizer-2.colors": [
    
        "colorizer.color-1",
        "colorizer.color-2",
        "colorizer.color-3"
    ]
```

- [Added keyboard shortcut to toggle between Terminals](https://til.hashrocket.com/posts/jh0gje9pds-toggle-between-terminals-in-vscode)
	- `cmd+shift+k` for focus next
	- `cmd+shift+j` for focus previous
- [Auto renaming HTML tags](https://roboleary.net/vscode/2020/08/05/dont-need-extensions.html)
	- enabled the setting `editor.linkedEditing`
	- only works for `.html` files; for React, you can right-click then use "Rename Symbol"
- [scroll 10 lines keyboard shortcut](https://stackoverflow.com/questions/61948360/how-to-scroll-10-line-vertically-with-keyboard-without-moving-cursor-in-vs-code)
	- mapped it to `ctrl+up/down`
	- installed Turbolog
	  - allows to quickly create console log messages and can delete all or uncomment all with one click
## Extensions

### Markdown Preview Github Styling
- installed this so Markdown previews look exactly like Github's
  - allows you to preview how your readme will look like

### close tabs to the left

- installed this to allow closing tabs to the left when you right click a tab

### Highlight

- removed this since I'm using the app imdone anyway
	- if I edit from imdone the weird formatting broke the highlights of this extension
		- ocd in me couldn't take it so I just uninstall this

## Font
- Fira Code 
  - `Fira Code, Menlo, Monaco, 'Courier New', monospace`
  - font weight 500
### JetBrains Mono
```json
"editor.fontFamily": "JetBrains Mono, Menlo, Monaco, 'Courier New'",
  "terminal.integrated.fontFamily": "Input Mono Compressed, monospace",
  "editor.fontLigatures": true,
  "editor.lineHeight": 0,
  "editor.fontSize": 13,
"editor.fontWeight": 300,
```
### Input Sans Compressed
```json
"editor.fontFamily": "Input Sans Compressed, Menlo, Monaco, 'Courier New'",
"terminal.integrated.fontFamily": "Input Mono Compressed, monospace",
"editor.fontLigatures": true,
"editor.lineHeight": 0,
"editor.fontSize": 13,
"editor.fontWeight": "normal",
```
### MonoLisa
```json
"editor.fontFamily": "MonoLisa, Menlo, Monaco, 'Courier New'",
"terminal.integrated.fontFamily": "Input Mono Compressed, monospace",
"editor.fontLigatures": true,
"editor.lineHeight": 0,
"editor.fontSize": 12,
"editor.fontWeight": "normal",
```

# Footer
---
Source:
Keywords: #vscode #programming 
Related: