---
date: '2021-07-01T13:55:23'
tags: ['gatsby']
title: 
published: true
description:
aliases:
references:
---

# Handling images in Gatsby
I use tthe gatsby-remark-images plugin, and it requires that you reference the image using the relative path, where that path is relative to the location of the Markdown file you're typing in.

This means I can store the images in a sub-folder and access them, but I cannot store the images in parent folder or higher and access those.

This is why the structure of my folder is:
```
2 - Blog Posts
	* _images
		*imageForFile.png
	* file.md
```

Then in *file.md*, can reference the image via:
```
![](./_images/imageForFile.png)
```


# Footer
---
Related: 