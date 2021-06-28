const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require("path")
const _ = require("lodash")
const slugify = require("slugify")

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
      value: `/blog/posts/${slugify(value, { lower: true })}`,
    })
  }
  // plugin-node-fields
  attachFields(node, actions, getNode, descriptors)
}

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

  // Create blog-list pages
  const posts = result.data.allMdx.edges
  const postsPerPage = 6
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve("./src/components/blogListTemplate.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // Create blog post pages.
  // const posts = result.data.allMdx.edges

  posts.forEach(({ node }, index) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/components/postPageTemplate.js`),
      context: { id: node.id },
    })
  })

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
