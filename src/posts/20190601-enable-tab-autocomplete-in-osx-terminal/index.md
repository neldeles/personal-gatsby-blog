---
categories: ["article"]
date: "2019-06-01T15:00:00+00:00"
tags: ["terminal", "bash"]
title: "Enable tab autocomplete in OSX Terminal"
published: true
---

When trying to navigate folders, typing out the complete folder names gets cumbersome, especially with more verbose names.

Solution is to enable autocomplete when you press `tab` in terminal. For exact steps, you may visit this [link](https://timleland.com/how-to-enable-autocomplete-in-mac-terminal/).

I'm also taking note of here for posterity's sake:

1. Type in terminal nano `~/.inputrc`
2. Paste the following on separate lines

   set completion-ignore-case on
   set show-all-if-ambiguous on
   TAB: menu-complete

3. Hit `control+O` to save changes to .inputrc followed by `control+X` to exit nano
4. Open a new Terminal window or tab to open a new session with autocomplete enabled
5. Type and hit the tab key
