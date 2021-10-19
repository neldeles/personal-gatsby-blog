---
date: '2021-10-17T14:49:54'
tags: ['storybook']
title: Actions and prevent default 
published: true
description:
aliases:
references: ['https://github.com/storybookjs/storybook/issues/128#issuecomment-743974520']
---

# Actions and prevent default

When I click a button in a form for example, the page gets redirected. This is caused by the default event when a button is clicked.

To solve, can use the ff utility function:
```jsx
const withPreventDefault = (action) => e => {
  e.preventDefault();
  return action(e);
};

const Template = ({ onClick, ...rest }) => (
  <MyComponent onClick={withPreventDefault(onClick)} {...rest} />
)
```

This prevents the default event and at the same time allows us to use Storybook's action add on.

## Make prevent default work when importing component for screens

I created a [LoginModal](hook://file/4crCwI39Z?p=bW9sZWN1bGVzL0xvZ2luTW9kYWw=&n=LoginModal%2Estories%2Ejs) and the above is working. However, when using this story in a [screen](hook://file/4crMH9SjI?p=c2NyZWVucy9Mb2dpblNjcmVlbg==&n=LoginScreen%2Estories%2Ejs), the prevent default stopped working. 

Solution is to explicitly map the arg.

Old:
```jsx
const Template = ({ onSubmit, ...rest }) => (
  <LoginModal onSubmit={withPreventDefault(onSubmit)} {...rest} />
);

export const Default = Template.bind({});
Default.args = {
  loading: false,
};
```

New:
```jsx
import {action} from '@storybook/addon-actions'
//...some code here
const Template = (args) => <LoginModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  loading: false,
  onSubmit: withPreventDefault(action("onSubmit")),
};
```
Important to notice here is we also import `action` and pass this. Otherwise you will receive the error `action is not a function`. 


Bonus: If you want to also execute your function, can refer to [this](https://stackoverflow.com/questions/59669031/i-want-storybook-addon-actions-to-display-its-standard-log-message-and-the-act). 

# Footer

---
## Related

---

## References
- https://github.com/storybookjs/storybook/issues/128#issuecomment-743974520