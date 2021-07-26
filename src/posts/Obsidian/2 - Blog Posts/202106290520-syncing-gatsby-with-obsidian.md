---
date: '2021-06-29T05:20:41'
tags: ['gatsby','obsidian']
title: Syncing Gatsby with Obsidian 
published: false
description: "How to setup your Obsidian vault and documents for seamless syncing with Gatsby"
aliases:
references:
---

This is how my current Gatsby project directory looks like:
![gatsby-project-directory](CleanShot%202021-06-29%20at%2005.23.37@2x.png)

### Handling images
 In Obsidian, I've imported the *Obsidian* folder as my vault. Then I make sure that all attachments are saved in a subfolder *_images* under current folder of the markdown file. This is important because this is where gatsby will locate the images of our blog posts.
![](CleanShot%202021-06-29%20at%2005.25.55@2x.png)

After dragging an image to a blog post, prefix the relative link with `./_images/`. This will render the image correctly when you publish the post.

### Handling blog posts
I have a few "parent" folders, but the important takeaway is that Gatsby will only pull blog posts from the *2 - Blog Posts* folder. And from this folder, only posts whose `published` YAML is set to `true`. 

### Handling internal links
The filenames in this folder should use hyphens instead of whitespace, and all lowercase. This is important for our internal markdownlinks, which preserves Obsidian's powerful backlinking while still working when published on our Gatsby site. 

Here's an example:
![](CleanShot%202021-06-29%20at%2005.34.37@2x.png)

Wikilinks do not work because they do not play well with Gatsby. For further elaboration, refer [here](https://dev.to/neldeles/comment/1fnep).


# Footer
---
Related: 