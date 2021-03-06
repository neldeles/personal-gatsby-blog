import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import Layout from "./layout"
import "twin.macro"
import SEO from "./seo"
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader"

// Components
import Tags from "./tags"

deckDeckGoHighlightElement()

export const query = graphql`
  query PostsByID($id: String!) {
    mdx(id: { eq: $id }) {
      body
      fields {
        tagsFormatted
      }
      frontmatter {
        title
        date(formatString: "YYYY MMMM Do")
        description
      }
    }
  }
`

const PostPageTemplate = ({ data }) => {
  const { frontmatter, body, fields } = data.mdx
  console.log(frontmatter)
  return (
    <Layout>
      <SEO title={frontmatter.title} description={frontmatter.description} />
      <div tw="relative py-16 bg-white">
        <div tw="relative px-4 sm:px-6 lg:px-8">
          <div tw="text-lg max-w-prose mx-auto">
            <h1>
              <span tw="block text-base text-center text-pink-600 font-semibold tracking-wide uppercase">
                {frontmatter.date}
              </span>
              <span tw="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {frontmatter.title}
              </span>
              <span tw="text-center mt-2 text-sm block">
                {fields.tagsFormatted != null &&
                  fields.tagsFormatted.length > 0 &&
                  fields.tagsFormatted.map((tag, i, arr) => {
                    if (arr.length - 1 === i) {
                      // last element in array
                      return <Tags key={tag} tag={tag} content="&nbsp;" />
                    } else {
                      return <Tags key={tag} tag={tag} content=",&nbsp;" />
                    }
                  })}
              </span>
            </h1>
            {frontmatter.description != null && (
              <p tw="mt-8 text-xl text-gray-500 leading-8">
                {frontmatter.description}
              </p>
            )}
            <hr tw="mt-6" />
          </div>
          <div tw="mt-6 prose prose-pink prose-lg text-gray-500 break-words mx-auto">
            <MDXRenderer>{body}</MDXRenderer>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PostPageTemplate
