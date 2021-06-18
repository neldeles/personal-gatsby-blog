# Adding styles to React app
There are different ways you can style a React app:
- use the [className](https://reactjs.org/docs/dom-elements.html#classname) attribute instead of the class attribute
- write styles directly in the code as so-called [inline styles](https://react-cn.github.io/react/tips/inline-styles.html)
	- any React component or element can be provided with a set of CSS properties as a JS object through the `style` attribute
	- hyphenated CSS properties are written in CamelCase
Example:
```js
const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2020</em>
    </div>
  )
}
```
## React's Philosophy on Styling

>  According to this older school of thought, the goal was to write CSS, HTML, and JavaScript into their separate files.
>
> The philosophy of React is, in fact, the polar opposite of this. Since the separation of CSS, HTML, and JavaScript into separate files did not seem to scale well in larger applications, React bases the division of the application along the lines of its logical functional entities.
>
> The structural units that make up the application's functional entities are React components. A React component defines the HTML for structuring the content, the JavaScript functions for determining functionality, and also the component's styling; all in one place. This is to create individual components that are as independent and reusable as possible.


Footer
---
Source:
Keywords: #react 
Related: