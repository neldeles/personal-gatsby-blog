---
date: "2021-06-07T15:24:00"
tags: ["gatsby", "graphql"]
title: Case insensitive tags in Gatsby
published: true
description: "How to create case insensitive tags in Gatsby."
aliases:
references:
---

Graphql has no way to handle case insensitivity at the moment. So case insensitivity for my tags frontmatter became an issue. This [Github thread](https://github.com/gatsbyjs/gatsby/issues/1789) elaborates on the issue.

One of the suggested solutions there is to use the Gatsby plugin [gatsby-plugin-node-fields](https://github.com/Undistraction/gatsby-plugin-node-fields). This is a guide for that solution.

## 1. Install the plugin

```bash
npm install --save gatsby-plugin-node-fields
```

## 2. Set the plugin up in gatsby-node

The plugin can either be configured as a plugin in gatsby-config, or as a function in your gatsby-node. I prefer the latter to keep all node-manipulation concerns in one file.

First import the plugin:

```js
// gatsby-node.js

const { attachFields } = require(`gatsby-plugin-node-fields`)
```

Next is to setup the descriptor. Important to understand what a `predicate` is.

> Each descriptor must provide a `predicate` - a function that will be passed the node and decides whether the descriptor should be used to transform it. For example we might want to check if the node is Markdown node, or if it represents a file from a particular directory.

In my case, it's to check if the node type is `Mdx`.

```js{7}
// gatsby-node.js

const { attachFields } = require(`gatsby-plugin-node-fields`)

const descriptors = [
  {
    predicate: node => node.internal.type === "Mdx",
    fields: [
      {
        name: "tagsFormatted",
        getter: node => node.frontmatter.tags,
        defaultValue: "",
        transformer: value =>
          isEmptyString(value) ? [] : tagsToLowerCase(value),
      },
    ],
  },
]
```

The `fields` key is more straightforward:

- `name` is the name of the field
- `getter` gets the values from the specified node (here we are getting the values of our tags frontmatter)
- `defaultValue` supplies default value where value on the node is `undefined`
- `transformer` is where the magic happens. It transforms our frontmatter tags to lower case with our custom `tagsToLowerCase` function. If there are no tags for the node, it returns an empty array.

The final code looks like this:

```js
// gatsby-node.js

const { attachFields } = require(`gatsby-plugin-node-fields`)

// lower case array
const tagsToLowerCase = tagsArr => {
  const output = tagsArr.map(tag => tag.toLowerCase())
  return output
}

const isEmptyString = value => {
  if (value === "") {
    return true
  }
  return false
}

const descriptors = [
  {
    predicate: node => node.internal.type === "Mdx",
    fields: [
      {
        name: "tagsFormatted",
        getter: node => node.frontmatter.tags,
        defaultValue: "",
        transformer: value =>
          isEmptyString(value) ? [] : tagsToLowerCase(value),
      },
    ],
  },
]

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      node,
      name: `slug`,
      value: `/blog/posts${value}`,
    })
  }
  // plugin-node-fields
  attachFields(node, actions, getNode, descriptors)
}
```

## 3. Query for your new field

Once it's setup, a new `tagsFormatted` node will appear under `fields`. You can then just query for it. This is how it looks like in my project:

```js{18-22}
// gatsby-node.js

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
      tagsGroup: allMdx(limit: 2000) {
        group(field: fields___tagsFormatted) {
          fieldValue
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  // Create tags pages
  const tags = result.data.tagsGroup.group

  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}`,
      component: path.resolve(`./src/components/tagsTemplate.js`),
      context: {
        tag: tag.fieldValue,
      },
    })
  })
}
```

`fields___tagsFormatted` values will all be lowercase.

# Footer

---
