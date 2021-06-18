# `null` vs `undefined`
I needed to style a Notification component in React depending on its context i.e. whether the event is `success` or `error`. So I had to decide how to handle this in my app's state hook.

I settled on the following:
```js
const [message, setMessage] = useState(
    {
      message: null,
      style: null
    }
  )
```
In coming up with this solution I had to fine-tune my understanding of `null` and `undefined`. I wasn't sure which value to assign to the property.

The confusion arose from my knowledge that `undefined` is for a variable that has been declared but no value assigned e.g.:
```js
const foo;
```
Does that mean for my *object*, given I'm not assigning any value to the property, I should assign it as `undefined`? This is incorrect. Why? Because for *objects*, a property that is `undefined` is something that does not exist e.g.: 
```js
const car = {
  model: 'Fiesta'
}

if (typeof car.color === 'undefined') {
  // color is undefined
}
```
So for my *object*, the property is defined — but it is an empty value ergo we set it to `null`.


Footer
---
Source:
Keywords: #javascript #react 
Related: