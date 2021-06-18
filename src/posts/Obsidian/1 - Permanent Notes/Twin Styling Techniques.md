---
aliases:
tags: ['twin', 'styled-components']
references:
- 'https://github.com/ben-rogerson/twin.macro/blob/d25b984a6f713ed96173e29cd49992fd4d783e78/docs/styled-import-guide.md'
- 'https://github.com/ben-rogerson/twin.macro/blob/d25b984a6f713ed96173e29cd49992fd4d783e78/docs/css-prop-guide.md'
- 'https://blog.formpl.us/twin-macro-tutorial-for-beginners-styling-with-tailwind-css-and-emotion-in-react-5228c819d713'
- 'https://stackoverflow.com/questions/56378786/what-is-the-use-case-of-styled-components-attrs-function'
---

# Twin styling techniques
A key consideration for me is how I will be able to declare any HTML attributes. We will use the `placeholder` attribute in the examples.

I've also illustrated how to define variables for styling technique. In case your Tailwind CSS becomes too unwieldy. These are all availalbe in the [sandbox](https://codesandbox.io/s/beautiful-leaf-f4ts0?file=/src/components/Input3.js).

## Styling with an array via the `CSS` prop
If your styles are mostly Tailwind, you can use this so that you don't need to wrap the Tailwind syntax in interpolations (`${}`) as you would if you used [[Twin Styling Techniques#Styling within a template string]].
```js
import tw, { css } from 'twin.macro'

const styles = {
  dark: tw`bg-black text-white border-white placeholder-gray-500 tracking-tight`,
}

const inputStyle = ({ isPrimary }) => [
  // Common base styles
  tw`rounded border`,
  // Conditional styles
  isPrimary && styles.dark,
  !isPrimary &&
    tw`bg-white text-black border-black placeholder-gray-700 tracking-wide`,
  // if you need regular css. be sure to import css
  css`
    box-shadow: 0 0.1em 0 0 rgba(0, 0, 0, 0.25);
  `,
]

const Input = props => <input css={inputStyle(props)} placeholder="text" />
								   
export default Input
```


## Styling within a template string and the `styled` import
This is the closest in similarity to the `styled-components` syntax. Great to use if you're using mostly native CSS and not Tailwind.
```js
import tw, { styled } from 'twin.macro'

const styles = {
  dark: tw`bg-blue-200 text-white border-white placeholder-gray-500 tracking-tight`,
}

const Input2 = styled.input.attrs({
  placeholder: 'placeholder',
})`
  // Common base styles
  ${tw`rounded border`}
  // Conditional styles
  ${({ isPrimary }) => isPrimary && styles.dark}
  ${props =>
    !props.isPrimary &&
    tw`bg-green-600 text-black border-black placeholder-gray-700 tracking-wide`}
`

export default Input2
```

## Styling with `styled` import and within an array
This is my preferred choice. Since I mostly use Tailwind CSS, the use of the array is essential to avoid having to write extra interpolation brackets.

I want to use `styled` import instead of `CSS` prop and JSX to take advantage of the `.attrs` method. With this I can easily set default values for attributes.
```js
import tw, { styled } from 'twin.macro'

const styles = {
  dark: tw`bg-black text-white border-white placeholder-gray-500 tracking-tight`,
}

const inputStyle = ({ isPrimary }) => [
  // Common base styles
  tw`rounded border`,
  // Conditional styles
  isPrimary && styles.dark,
  !isPrimary &&
    tw`bg-white text-black border-black placeholder-gray-700 tracking-wide`,
]

export default styled.input.attrs(props => ({
  placeholder: props.placeholder || 'empty placeholder',
}))(inputStyle)
```

## Update on preferred choice
After some experience, I've decided that my preferred is [[Twin Styling Techniques#Styling within a template string and the styled import]]. The extra interpolation brackets are a minor trade-off compared to the shorter overall code when working with multiple styled components within a component.

![[CleanShot 2021-03-29 at 18.38.11@2x.png]]

Notice in 1 how if I want to maintain readability I have to make use of a `InputAttrs` variable. If multiple styled components need attributes, then code length increases.

Option 2 is my preferred choice as I can keep everything within 1 styled-component. This makes the component succint. Live example can be found in [this](https://codesandbox.io/s/goofy-payne-1tu8c?file=/src/index.js) Codesandbox.

# Footer
---
Related: 