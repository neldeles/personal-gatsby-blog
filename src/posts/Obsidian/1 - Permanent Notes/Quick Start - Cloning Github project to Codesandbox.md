---
aliases:
tags: ['codesandbox', 'degit', 'twin']
references:
---

# Importing a copy of Github project to Codesandbox

In this example we will be making a copy of a private third-party repository and importing that into Codesandbox.

---
I wanted to try out Twin and `create-react-app` quickly. In the documentation, it instructs to use `degit` to make a copy of the repository.

Open up Terminal and navigate to your desired project folder:
```shell
cd projects
```

Then copy the repo using `degit` in your desired folder. In my case it's *cra-twin*:
```shell
npx degit https://github.com/ben-rogerson/twin.examples/cra-styled-components cra-twin
```

This next step is **crucial** to get your project working in Codesandbox when you import it. In your project's root folder (cra-twin for me), [create the file *sandbox.config.json* with the ff contents](https://github.com/codesandbox/codesandbox-client/issues/2111#issuecomment-597580065):
```json
{
  "template": "node"
}
```
What this does is it explicitly sets the environment of your Codesandbox project to Container. You need to set it to this environment otherwise the dev dependencies will not be installed by Codesandbox. Twin is a dependency, ergo it will not be installed otherwise.


After that you need to upload it to Github. So [[Quick Start - Initializing Git for a project| setup git for your project]].

Then you can just import your Github repo into Codesandbox.





# Footer
---
Related: 