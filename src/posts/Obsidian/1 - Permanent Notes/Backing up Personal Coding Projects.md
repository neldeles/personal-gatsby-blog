# Backing up personal coding projects
I've encountered issues storing my web dev projects in OneDrive. There isn't any way to set a `.gitignore` file, so my `node_modules` folder caused OneDrive to crash my Mac.

I researched on the issue, and it seems this is a common pain that comes with storing your projects in cloud-service providers.

The solution therefore is to use Git for **everything**, foregoing storing projects in cloud-service providers altogether. For small test projects, what I can do is create a catch-all-screwing-around repo, and create a new branch for each new small project. 

> Yeah this is probably the best bet. A private repo with all the projects not worth putting into their own repo. Each time you start a new _"project not worth a repo"_ create a new branch in this repository and that way you even can maintain control over which _"projects not worth a repo"_ are even visible in the master branch of the _"projects not worth a repo repo"_

Footer
---
Source:
Keywords: #git #programming #workflows
Related: