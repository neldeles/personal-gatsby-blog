---
aliases:
tags: ['react']
references:
- 'https://stackoverflow.com/questions/42464888/how-do-i-change-the-background-color-of-the-body'
---

# Overflow scrollbar issue
  When coding my blog, encountered an issue wherein visiting certain pages in my blog, the header would sometimes move inward. Discovered the root cause for this was the scrollbar appearing. 
  
  Quick fix solution is to just enable the scrollbar visibiIty by default. You apply this on the `body` tag.
  
  Now in React, the `body` tag isn't easily accessible. So the easiest solution, without needing any additional external Iibraries or javascript, is to just add it to the *index.css* file.
  
  > The above solutions tell about adding the external library to give the required functionality but instead what you can do is just go to your Index.css file and inside the already written 'body' tag put "background-color: 'color'" and its done

Specfic steps:
1. Create your *index.css* file with the ff content: 
```css
body {

 overflow-y: scroll;

}
```
2. Go to your *index.js* file and import it `import '../index.css'` 


# Footer
---
Related: 