---
date: '2021-11-01T16:31:52'
tags: tailwind,
title:
published: false
description:
aliases:
references:
zet_id: 20211101T163152
date_modified: 2021-11-01T16:33:53
---

# Configuring tailwindcss-intellisense plugin

I added the ff to my VSCode settings.json:

```json
"tailwindCSS.experimental.classRegex": [
    ["/\\*tw\\*/ ([^;]*);", "\"([^\"]*)\""]
]
```

That's a modified version of this: https://github.com/tailwindlabs/tailwindcss-intellisense/issues/129#issuecomment-917271069

Allows linting and autocomplete to work in objects:

![](CleanShot-2021-11-01-at-16.33.41@2x.png)

# Footer

---

## Related

---

## References