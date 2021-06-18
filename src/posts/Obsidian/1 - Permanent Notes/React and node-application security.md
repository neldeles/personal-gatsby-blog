---
aliases:
tags: ['react', 'security']
references:
- 'https://fullstackopen.com/en/part7/class_components_miscellaneous#react-node-application-security'
---

# React and node-application security
## Threats to be aware of
- SQL-injection
	- mongoose sanitizes the queries for us
- cross-site scripting
	- React sanitizes data in variables for us

## Helpful packages
### Install Helmet
If using `express` it is recommended to install the [Helmet](https://helmetjs.github.io/) library in the backend.
### Esllint security plugin
Using the ESlint [security-plugin](https://github.com/nodesecurity/eslint-plugin-security) is also worth doing.

# Footer
---
Related:
- [[React MOC]]