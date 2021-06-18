---
aliases:
tags: ['gatsby']
references:
---

# Flash of unstyled content 
When coding my blog, encountered this issue. Google search results were of no help, since my Emotion was configured correctly.

> Keep in mind that styles aren’t applied until the JavaScript loads hence a plugin to extract the styles is necessary to prevent flash of unstyled content (FOUC). To cater for this, every CSS-in-JS library has a Gatsby plugin which you need to extract styles and insert them into the HTML during builds and this prevents FOUC.

This paragraph in the [documentation](https://www.gatsbyjs.com/docs/how-to/styling/css-in-js/), specifically the line, **Keep in mind that styles aren't applied until the JavaScript loads**, was the aha moment.

I was using the React Library React-Text-Loop which didn't have a Gatsby plugin. Hence, it was waiting for the JavaScript to load before the CSS styles were appIied aka FOUC error. 

My hacky solution is to introduce a page load delay to my blog. I used this tutorial as a basis: https://dev.to/zakirsajib/adding-loader-spinner-in-gatsby-site-n4g 

What I did different is I preloaded the header and footer of my blog instead.

# Footer
---
Related: 