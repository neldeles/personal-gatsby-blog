---
date: '2021-11-01T15:14:44'
tags: #create-react-app #eslint 
title:
published: false
description:
aliases:
references:
zet_id: 20211101T151444
---

# Setting up `eslint-plugin-tailwindcss` with CRA

CRA alread comes with ESLint pre-configured. So no need to install the eslint dependency and create a **.eslintrc** file. Instead, in your **package.json** file edit `"eslintConfig"`:

```json
"eslintConfig": {
    "plugins": [
      "tailwindcss"
    ],
    "extends": [
      "react-app",
      "react-app/jest",
      "plugin:tailwindcss/recommended"
    ],
    "overrides": [
      {
        "files": [
          "**/*.stories.*"
        ],
        "rules": {
          "import/no-anonymous-default-export": "off"
        }
      }
    ],
    "settings": {
      "tailwindcss": {
        "callees": [
          "classnames",
          "clsx",
          "ctl",
          "classNames"
        ]
      }
    }
  },
```

Notice how I added `classNames` as a callee also. This is because I don't use a 3rd party library to handle conditionals in Tailwind. Instead I use a `classNames` [utility function](202106241440-convert-ternary-operator-in-tailwindcss-for-twin.md). This allows the Iinter to run on Tailwind classes declared in a `classNames` function.

# Footer

---

## Related

---

## References