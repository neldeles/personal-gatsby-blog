---
date: '2021-07-02T19:21:22'
tags: ['twin']
title: 
published: true
description:
aliases:
references:
---

is it possible to do one-shot css component overrides with the prop styling method? 

This is using the styled-component method and it works fine:

```js
<Button
  onClick={() => setWalletModalOpen(true)}
  variant="primary"
  tw="w-3/4 mt-1 leading-4"
>
  Add wallets
</Button>
```

Trying the same thing on the prop styling method doesn't work. I've tried passing them in as extraCss prop and assigning it to tw in the component, but it didn't work either.

```js
const Button = ({ onClick, buttonText, variant, extraCss }) => {
  return (
    <button type="button" css={style.button({ variant })} tw={extraCss} onClick={onClick}>
      {buttonText}
    </button>
  );
};

```

Yeah we can't pass styles into the tw prop as you've got in that last example. They need to be added as a string so twin knows what to convert. Try converting the value of the css prop into an array and making extraCss the second item.

```js
const Button = ({ onClick, buttonText, variant, extraCss }) => {
  return (
    <button type="button" css={[style.button({ variant }), extraCss]}{...{ onClick }>
      {buttonText}
    </button>
  );
};
```

# Footer
---
Related: 