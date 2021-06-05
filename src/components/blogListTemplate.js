import { jsx } from "@emotion/react"
import * as React from "react"
import { graphql, Link } from "gatsby"
import tw from "twin.macro"

// Components
import Layout from "./layout"
import ContentContainer from "./contentContainer"
import { ProseContainer, H1, ListLink } from "./styles"
import Tags from "./tags"

export const query = graphql`
  query HomePageQuery($skip: Int!, $limit: Int!) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
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

const BlogPage = ({ data, pageContext }) => {
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1 ? "/blog" : "/blog/" + (currentPage - 1).toString()
  const nextPage = "/blog/" + (currentPage + 1).toString()
  return (
    <Layout>
      <ContentContainer>
        <ProseContainer>
          {data.allMdx.nodes.map(({ excerpt, frontmatter, fields, id }) => {
            return (
              <React.Fragment key={id}>
                <Link to={fields.slug}>
                  <H1>{frontmatter.title}</H1>
                </Link>
                <p tw="block text-base text-gray-900 font-normal tracking-wide">
                  {frontmatter.date}
                  {frontmatter.tags != null &&
                    frontmatter.tags.length > 0 &&
                    frontmatter.tags.map((tag, i, arr) => {
                      if (i === 0) {
                        // first element in array
                        if (arr.length === 1) {
                          return (
                            <React.Fragment key={tag.concat(id)}>
                              <span> — </span>
                              <Tags tag={tag} content="&nbsp;" />
                            </React.Fragment>
                          )
                        } else {
                          return (
                            <React.Fragment key={tag.concat(id)}>
                              <span> — </span>
                              <Tags tag={tag} content=",&nbsp;" />
                            </React.Fragment>
                          )
                        }
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
              </React.Fragment>
            )
          })}
          <div tw="flex">
            {!isFirst && (
              <Link
                to={prevPage}
                rel="prev"
                tw="text-lg mr-auto text-pink-600 underline font-medium hover:(cursor-pointer)"
              >
                ← Previous Page
              </Link>
            )}
            {!isLast && (
              <ListLink
                destination={nextPage}
                content="Next Page →"
                rel="next"
              />
            )}
          </div>
        </ProseContainer>
      </ContentContainer>
    </Layout>
  )
}

export default BlogPage
