---
date: '2021-06-21T00:19:48'
tags: ['react','tailwindcss']
title: there are no focusable elements inside the <FocusTrap />
published: true
description:
aliases:
references:
---

This error was being thrown when I tried to use the *Simpler Alert Modal* of TailwindUI. 

After googling, the ff resources helped me fix the error:
- https://github.com/tailwindlabs/headlessui/issues/265

The gist of it is [this](https://github.com/tailwindlabs/headlessui/issues/265#issuecomment-846637541):

> What [@1trackprojects1](https://github.com/1trackprojects1) has stated, your `Dialog` needs a focusable element within it. You can use a ref, or a semantic close button which is an implicit focusable element.
> For example you can add this to the top of your modal:
>
> ```js
> <div className="absolute top-1 right-1">
>   <button
>     type="button"
>     className="inline-flex justify-center px-2 py-1 text-sm font-medium text-gray-200 bg-gray-900 border border-transparent rounded hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
>     onClick={closeModal}
>   >
>     X
>   </button>
> </div>
> ```
>
> And you won't see this error.

The solution I used, as suggested [here](https://github.com/tailwindlabs/headlessui/issues/265#issuecomment-835888771):
> I'm having the same issue but i have no clue whats wrong im using tailwindui's new react code for the navbar
> 
> Re: FIXED IT!
> 
> for anyone else having same issue please go to https://headlessui.dev/react/dialog#managing-focus-within-your-dialog
> and see the Managing focus within your dialog section
> 
> add the ref and initialFocus to the elements as shown and the navigation issue should be fixed!


# Footer
---
Related: 