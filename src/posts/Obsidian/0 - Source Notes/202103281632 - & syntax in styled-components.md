---
aliases:
tags: ['styled-components']
references:
---

# `&` syntax in `styled-components`
When searching for Twin + Styled Components tutorials, this was one of the first results: https://www.freecodecamp.org/news/how-to-style-your-react-apps-with-less-code-using-tailwind-css-and-styled-components/

One part that stood out to me was the syntax used for Twin and `styled-components`:
```js
import styled from "styled-components"
import tw from "twin.macro"

const StyledForm = styled.main.attrs({
  className: "flex flex-col h-screen justify-center items-center bg-gray-100",
})`
  & {
    form {
      ${tw`bg-white text-center rounded py-8 px-5 shadow max-w-xs`}
    }
    input {
      ${tw`border-gray-300 mb-4 w-full border-solid border rounded py-2 px-4`}
    }
    button {
      ${tw`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-blue-700 rounded`}
    }
  }
`
export default StyledForm
```
The accompanying explanation:
> We start by importing `tw` which allows us to use Tailwind classes in nested properties. It's perfectly fine to use the utility classes with the `className` attribute, but if you want to nest properties you have to use the `twin.macro` library.

I thought `&` was Twin-specific syntax. Apparently it's `styled-components` specific, used as pseudo selectors. The [documentation](https://styled-components.com/docs/basics#pseudoelements-pseudoselectors-and-nesting) has detailed explanation and examples.

But the gist is `&` is used to refer back to the main component.
![[CleanShot 2021-03-28 at 16.56.21@2x.png]]

If you put selectors in without `&`, they will refer to children of the component:
![[CleanShot 2021-03-28 at 17.16.39@2x.png]]

## Important
It's important to note though that the nesting of components he did [isn't recommended](https://dev.to/titungdup/what-do-you-think-about-nested-styles-in-styled-components-3pdf). It defeats the purpose and nullified the advantages `styled-components` provides, namely the decoupling and independence of the CSS so that you can define separate styles for each element for reusability.

# Footer
---
Related: 