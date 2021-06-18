# Mission Control Crash
Issue is gestures weren't working. Found the following solution:

---
I had exactly the same thing! And indeed it worked under a new user. After some digging, I noticed that is was mission control that wouldn't start . So: Finder -> Applications -> Mission Control -> No response.

If you have this too, you can fix it like this:

➜ ~ defaults read com.apple.dock mcx-expose-disabled 1

1 = mission control disabled, then do:
➜ ~ defaults write com.apple.dock mcx-expose-disabled -bool FALSE
➜ ~ defaults read com.apple.dock mcx-expose-disabled 0
➜ ~ killall Dock

Footer
---
Source: https://discussions.apple.com/thread/251461614
Keywords: #macos #troubleshooting 
Related: 