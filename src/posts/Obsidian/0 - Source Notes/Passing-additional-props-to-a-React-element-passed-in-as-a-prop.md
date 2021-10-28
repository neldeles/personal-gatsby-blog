---
date: '2021-10-27T20:08:37'
tags: react, storybook, interpolation
title:
published: false
description:
aliases:
references: ['https://stackoverflow.com/questions/49832457/how-to-add-additional-props-to-a-react-element-passed-in-as-a-prop']
zet_id: 20211027T200837
date_modified: 2021-10-28T08:53:34
---

# Passing additional props to a React element passed in as a prop

> Pass in the component constructor instead of an instance

What this means is that instead of `<MenuItem icon={<MdInbox />} />` which is an *instance* of the component,  use the constructor: `<MenuItem icon={MdInbox} />`.

So given the following parent component `Menu` (I am using functional components here since the example in the Stackoverflow thread used class components):

```jsx
function Menu() {
	return (
		<div>
			<MenuItem icon={MdInbox} />
		</div>
	)
}
```

We can pass additional props to `MdInbox` in the child component `MenuItem` like this:

```jsx
function MenuItem({icon}) {
	const Icon = icon
	return (
		<div>
			<Icon size={24} />
		</div>
	)
}
```

## Why it works

Core concept here is interpolation. In react, `{}` is used to signal that we're entering Javascript land from JSX land. So we're telling Babel, "Hey, just compile this as is." So we are just passing in the constructor as a prop, which allows use to call it from within the child compnent "normally."

![](CleanShot-2021-10-28-at-08.39.46@2x.png)

## Storybook

I faced this specific issue in Storybook and using the Heroicons React library. I wanted to accept icons in a functional component, with that functional component applying styles to it. This way the user aka dev only needs to pass in the Heroicon Component without worrying about the styles.

This is how [the code](hook://file/4z9blDZco?p=c2lkZWJhci9OYXZpZ2F0aW9uSXRlbQ==&n=NavigationItem%2Ejs) looks like:

```jsx
function NavigationItem({ label, href, current, icon: Icon, navSubItems }) {
  return (
      <div>
        <a
          href={href}
          css={[
            tw`w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md`,
            !current &&
              tw`bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900`,
            current && tw`bg-gray-100 text-gray-900`,
          ]}
          className="group"
        >
          <Icon
            css={[
              tw`mr-3 flex-shrink-0 h-6 w-6`,
              !current && tw`text-gray-400 group-hover:text-gray-500`,
              current && tw`text-gray-500`,
            ]}
            aria-hidden="true"
          />
          {label}
        </a>
      </div>
    )
}
```
You can see that I also re-named the prop variable since components should be capitalized.

Here's its corresponding Storybook story:

```jsx
/** @jsxImportSource @emotion/react */
import "twin.macro";
import { NavigationItem as EmptyNavigationItem } from ".";
import { HomeIcon } from "@heroicons/react/outline";

// ...some code

const Template = (args) => <NavigationItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Budget",
  href: "#href",
  current: true,
  // component constructor
  icon: HomeIcon,
};
```

**Bonus: 🤦‍♂️ moment!**
I spent hours before figuring this out and yet...this is the default setup in TailwindUI already zzzzz. The anser was right under my nose and I didn't even realise it. But it probably is because I didn't understand why it was coded that way in the first place. Now I do.

![](CleanShot-2021-10-27-at-21.17.42@2x.png)
![](CleanShot-2021-10-27-at-21.19.11@2x.png)

# Footer

---

## Related

---

## References