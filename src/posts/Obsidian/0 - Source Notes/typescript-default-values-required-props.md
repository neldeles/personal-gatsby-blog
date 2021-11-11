---
date: '2021-11-08T20:08:48'
tags: typescript,
title: Default values for required props
published: false
description:
aliases:
references:
zet_id: 20211108T200848
date_modified: 2021-11-08T20:11:39
---

# Default values for required props

> if you want to pass default value that means value is not mandatory. if value will not come then you have default value.

Need to drill this logic into my head. The reason why [this issue](https://github.com/microsoft/TypeScript/issues/31247) exists is because of that logic above.

Definition of required is something that the user needs to pass. If there is a default value, it means user doesn't need to pass anything. Hence it is not required.

# Footer

---

## Related

---

## References

- https://stackoverflow.com/questions/68280956/how-to-set-default-props-to-required-props-in-functional-components