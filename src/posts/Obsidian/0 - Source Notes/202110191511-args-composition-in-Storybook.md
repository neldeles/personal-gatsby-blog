---
date: '2021-10-19T15:11:08'
tags: ['storybook']
title: 
published: true
description:
aliases:
references:
---

# Args composition in Storybook

Allows you to keep your code DRY, since you are just re-using previously written stories. Also preserves the Control add-on for the prop.

Will require a shift in mindset when writing your components. What I mean is that the pattern is quite similar to [component composition](202110191518-component-composition.md). Main difference is that this is more of a presentational container. This means the props are tied to the props of your nested components.

```jsx
/** @jsxImportSource @emotion/react */
import "twin.macro";
import PropTypes from "prop-types";

import { H2 } from "components/atoms/Heading/Heading";
import { LoginModal } from "components/molecules/LoginModal";

export function LoginScreen({ header, loading, onSubmit }) {
  return (
    <div tw="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div tw="sm:mx-auto sm:w-full sm:max-w-md">
        <H2 value={header} tw="text-center" />
      </div>
      <LoginModal loading={loading} onSubmit={onSubmit} />
    </div>
  );
}

LoginScreen.propTypes = {
  /** Content of the H2 component  */
  header: PropTypes.string,
  /** Flag for loading state of LoginModal component */
  loading: PropTypes.bool,
  /** Event handler for form submission of LoginModal component */
  onSubmit: PropTypes.func,
};
```

# Footer

---
## Related

---

## References