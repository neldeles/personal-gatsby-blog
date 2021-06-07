import React from "react"
import PropTypes from "prop-types"
import tw from "twin.macro"

// Components
import { Link, graphql } from "gatsby"
import Layout from "./layout"
import ContentContainer from "./contentContainer"
import { ProseContainer, H1, ListLink } from "./styles"

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMdx
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <Layout>
      <ContentContainer>
        <ProseContainer>
          <H1>{tagHeader}</H1>
          <Link to="/tags" tw="text-center mt-2 block ">
            <span tw="text-sm underline hover:(bg-pink-600 text-white cursor-pointer)">
              All tags &#8594;
            </span>
          </Link>
          <ul>
            {edges.map(({ node }) => {
              const { slug } = node.fields
              const { title } = node.frontmatter
              return (
                <li tw="list-disc mt-6" key={slug}>
                  <ListLink destination={slug} content={title} />
                </li>
              )
            })}
          </ul>
          {/*
              This links to a page that does not yet exist.
              You'll come back to it!
            */}
        </ProseContainer>
      </ContentContainer>
    </Layout>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { tagsFormatted: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
