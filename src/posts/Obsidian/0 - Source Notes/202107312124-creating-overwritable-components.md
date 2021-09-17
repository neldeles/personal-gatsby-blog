---
date: '2021-07-31T21:24:52'
tags: ['react', 'epicreact']
title: 
published: true
description:
aliases:
references:
---

# Creating overwritable components

```js
function Box({style, size, className = '', ...otherProps}) {
  const sizeClassName = size ? `box--${size}` : ''
  return (
    <div
      className={`box ${className} ${sizeClassName}`}
      style={{fontStyle: 'italic', ...style}}
      {...otherProps}
    />
  )
}

function App(){
	return (
		<Box size="small" style={{backgroundColor: 'lightblue'}}>
        	small lightblue box
		</Box>	
	)
}
```

Can easily overwrite the `className` or `style` of the component because of how our custom component is implemented. 

For example, if we want our `Box` to have a custom class:
```js
// customClass will be added to the attribute
<Box size="small" className="customClass"/>
```


# Footer
---
Related: 