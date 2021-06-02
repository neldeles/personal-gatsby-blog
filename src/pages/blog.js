import { jsx } from "@emotion/react"
import * as React from "react"
import { graphql, Link } from "gatsby"
import tw from "twin.macro"

// Components
import Layout from "../components/layout"
import ContentContainer from "../components/contentContainer"
import Tags from "../components/tags"

export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      nodes {
        id
        excerpt
        frontmatter {
          title
          date(formatString: "[']YY MMM DD")
          description
          tags
        }
        fields {
          slug
        }
      }
    }
  }
`

const styles = {
  tags: tw`font-normal hover:(bg-pink-600 text-white cursor-pointer)`,
}

const BlogPage = ({ data }) => {
  return (
    <Layout>
      {
        <ContentContainer>
          {
            <div>
              {data.allMdx.nodes.map(({ excerpt, frontmatter, fields, id }) => {
                return (
                  <div tw="max-w-prose mx-auto" key={id}>
                    <Link to={fields.slug}>
                      <h1 tw="mt-2 mb-1.5 block text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        {frontmatter.title}
                      </h1>
                    </Link>
                    <p tw="block text-base text-gray-900 font-normal tracking-wide">
                      {frontmatter.date}
                      {frontmatter.tags != null &&
                        frontmatter.tags.length > 0 &&
                        frontmatter.tags.map((tag, i, arr) => {
                          if (i === 0) {
                            // first element in array
                            return (
                              <React.Fragment key={tag.concat(id)}>
                                <span> — </span>
                                <Tags tag={tag} content=",&nbsp;" />
                              </React.Fragment>
                            )
                          }
                          if (arr.length - 1 === i) {
                            // last element in array
                            return (
                              <Tags
                                key={tag.concat(id)}
                                tag={tag}
                                content="&nbsp;"
                              />
                            )
                          } else {
                            return (
                              <Tags
                                key={tag.concat(id)}
                                tag={tag}
                                content=",&nbsp;"
                              />
                            )
                          }
                        })}
                    </p>

                    <p tw="mt-4 mb-10 prose prose-indigo text-gray-500 mx-auto">
                      {frontmatter.description || excerpt}
                    </p>
                  </div>
                )
              })}
            </div>
          }
        </ContentContainer>
      }
    </Layout>
  )
}

export default BlogPage
