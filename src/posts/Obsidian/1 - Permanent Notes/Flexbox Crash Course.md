---
aliases:
tags: ['css', 'flexbox']
references: ['https://www.freecodecamp.org/news/understanding-flexbox-everything-you-need-to-know-b4013d4dc9af/']
---

# Flexbox Crash Course 
To use the Flexbox model, you must make a parent element a flex container (AKA _flexible container_).

You do this by setting `display: flex` or `display: inline-flex` for the inline variation. It's that simple, and from there you're all set to use the Flexbox model.

Once initiated, the outside container becomes the **flex container** and the child elements become **flex items**.

## Flex container properties
1. `flex-direction`: how flex items are laid out, either main-axis (left to right) or cross-axis (top to bottom). There are corresponding values to reverse these as well (right to left or bottom to top)
2. `flex-wrap`: similar functionality to word wrap
3. `flex-flow`: shorthand property that combines `flex-direction` and `flex-wrap`
4. `justify-content`: defines how flex items are laid out on the *main axis* (similar to `text-align`). The default value is `flex-start`.
5. `align-items`: defines how flex items are laid out on the *cross axis*
6. `align-content`: same as `align-items` except for the `baseline` value. Used **only** on multi-line flex containers (created via the `flex-wrap`)

## Flex Item Properties
1. `order`: Alows you to reorder flex items within a container without changing the position of the flex items in the HTML source code. 
2. `flex-grow` and `flex-shrink`: controls how much a flex-item should extend if there are extra spaces or shrink if there are no extra spaces.
3. `flex-basis`: specifies the initial size of a flex-item (before `flex-grow` and `flex-shrink` is applied). By default is set to `auto`, which computes the size based on the content size and whatever padding you set.
4. `flex`: shorthand for `flex-grow`, `flex-shrink`, and `flex-basis`, in that order (acronym GSB). Setting GS only B defaults to zero which is an *absolute* flex. Setting B only, you get *relative* flex. 
5. `align-self`: `align-items` but only for a **single** flex-item.

### useful `flex` shorthand values
1. `flex:0 1 auto`
Same as writing `flex:default` and is the default behavior of all flex items.
![[9UYQa-EPoyus-A0Oyz61rMbIrnIQEalHerMJ.png]]
Notice how the flex items don’t grow. The width is computed automatically, and they shrink upon resizing the browser — if necessary.
2. `flex: 0 0 auto`
Same as `flex:none`.
![[vP2z580Ytr9gv3yKyAQyjYVFb8-qr1dRDOZN.png]]
Fixed width element whose initial width is based off of the content size in the flex item.
3. `flex: 1 1 auto`
Same as `flex:auto`. 
![[oIhOowjCWc0VuZqGiPy6miUwVpUknQUjnsJ4.png]]
This says, _"compute initial width automatically, but grow to fit the entire available space and shrink if necessary"_



## Absolute and Relative flex-items
The spacing within a relative flex item is computed based on it’s content size. In an absolute flex item, it is based solely on “flex”, not content.

Important to note for *absolute* flex items, when there are two or more flex-items with zero based `flex-basis` values, they share the spacing available based on the `flex-grow` values.
![[1vaSuvYJiwBRZA2tgd9U4iA4abRWhmCLWSnR.png]]
The initial widths of the flex-items is zero `flex-basis: 0`, and then they “_grow”_ to fit the available space.

If we set them to to a *relative* flex item, it would look like this:
![[jtFUbFKluKua-rnhUg7TBDkzZ9Q7afq-csO1.png]]

## Auto-margin Alignment
**Beware of `margin:auto` alignment on flex items.** When you use `margin:auto` on a flex-item, the direction (left, right, or both) that has the value `auto` will take up any empty spaces available. 
![[DahLZz6Cn5plr-2Mug6Itth90B5Gp-RrYO-1.jpg]]
Given this navbar with `flex: 0 0 auto`, if we use `margin-right:auto` on the first list item (branding):
![[Z9l-DWS8cWh5ihYUVcGMjIYKmuHKR5nToIJy.png]]
The extra space that existed has now been distributed to the right of the first flex-item. If you wanted auto margin alignment on both sides of a flex-item, so you apply `margin-left:auto` and `margin-right:auto`:
![[swRJd9celASXulipDVS77ltOFIZ-dF4Rq4-2.png]]

There is a tradeoff if you use the margin-auto trick: **If you use auto-margin aIignment on a flex-item, `justify-content` property no longer works**. 

# Footer
---
Related: 