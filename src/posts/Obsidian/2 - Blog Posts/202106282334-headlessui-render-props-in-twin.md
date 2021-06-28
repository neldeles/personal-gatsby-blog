---
date: "2021-06-28T23:34:23"
tags: ["twin"]
title: HeadlessUI render props in Twin
published: true
description: Adapting the Dropdown TailwindUI component for Twin.macro
aliases:
references:
---

Finally got it working for the Listbox. Was trying to use one of TailwindUI's Dropdown components which is built upon HeadlessUI's Listbox.

The relevant TailwindUI code that was giving me issues:

```js{16-21}
// Original TailwindUI Code
<Transition
  show={open}
  as={Fragment}
  leave="transition ease-in duration-100"
  leaveFrom="opacity-100"
  leaveTo="opacity-0"
>
  <Listbox.Options
	static
	className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
  >
	{people.map((person) => (
	  <Listbox.Option
		key={person.id}
		className={({ active }) =>
		  classNames(
			active ? 'text-white bg-indigo-600' : 'text-gray-900',
			'cursor-default select-none relative py-2 pl-3 pr-9'
		  )
		}
		value={person}
	  >
		{({ selected, active }) => (
		  <>
			<span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
			  {person.name}
			</span>

			{selected ? (
			  <span
				className={classNames(
				  active ? 'text-white' : 'text-indigo-600',
				  'absolute inset-y-0 right-0 flex items-center pr-4'
				)}
			  >
				<CheckIcon className="h-5 w-5" aria-hidden="true" />
			  </span>
			) : null}
		  </>
		)}
	  </Listbox.Option>
	))}
  </Listbox.Options>
</Transition>
```

This is how my final working code looks like:

```js
import { ClassNames } from "@emotion/react"

// ...more code
;<ClassNames>
  {({ css }) => (
    <Transition
      show={open}
      as={Fragment}
      leave={css(tw`transition ease-in duration-100`)}
      leaveFrom={css(tw`opacity-100`)}
      leaveTo={css(tw`opacity-0`)}
    >
      <Listbox.Options
        static
        tw="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
      >
        {people.map(person => (
          <Listbox.Option key={person.id} value={person}>
            {({ selected, active }) => (
              <div
                css={[
                  tw`cursor-default select-none relative py-2 pl-3 pr-9`,
                  active && tw`text-white bg-indigo-600`,
                  !active && tw`text-gray-900`,
                ]}
              >
                <span
                  css={[
                    tw`block truncate`,
                    selected && tw`font-semibold italic`,
                    !selected && tw`font-normal`,
                  ]}
                >
                  {person.name}
                </span>

                {selected ? (
                  <span
                    css={[
                      tw`absolute inset-y-0 right-0 flex items-center pr-4`,
                      active && tw`text-white`,
                      !active && tw`text-indigo-600`,
                    ]}
                  >
                    <CheckIcon tw="h-5 w-5" aria-hidden="true" />
                  </span>
                ) : null}
              </div>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Transition>
  )}
</ClassNames>
```

Import of `ClassNames` is to [get animations working](202106281736-enabling-animations-of-tailwindui-in-twin).

To get the `active` styles working, what I did was to change the `Fragment` to a `div` and move the relevant css to that `div`, instead of writing it inside `<Listbox.Option>`.

What made me think of trying this out is [this article on render props](https://blog.logrocket.com/react-reference-guide-render-props/#renderprops), specifically the parts **Implementing render props** and **Implementing other props**.

Lines 15-20 in _Original TailwindUI Code_ are equivalent to using the `render` prop:

```js
const Dismiss = (props) => {
  const dismiss = () => {
    ...code to implement dismissal animations etc
  }

  return props.render(dismiss)
}

const DismissableContent = () => {
  return (
    <Dismiss render={
      dismiss => <Content dismiss={dismiss} />
    } />
  )
}
```

whereas line 24 in _Original TailwindUI Code_ is similar to the example given in **Implementing other props**:

```js
const Dismiss = ({ children }) => {
  const dismiss = () => {
    ...code to implement dismissal animations etc
  }

  return children(dismiss)
}

const DismissableContent = () => {
  return (
    <Dismiss>
      {(dismiss) => (
        <Content dismiss={dismiss} />
      )}
    </Dismiss>
  )
}
```

Both are functionally the same, but just with different implementations. Thus applying it to this problem of mine, I assume they are refering to the same `active` render prop argument, and I could just implement them under the child function.

_Caveat_: So far it's working, but I do not actually know if implementing it this way will have adverse effects.

# Footer

---

Related:
