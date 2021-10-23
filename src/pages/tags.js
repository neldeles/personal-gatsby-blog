import React from "react"
import PropTypes from "prop-types"
import "twin.macro"

// Utilities
import kebabCase from "lodash/kebabCase"

// Components
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import ContentContainer from "../components/contentContainer"
import { H1, ProseContainer } from "../components/styles"

const TagsPage = ({
  data: {
    allMdx: { group },
  },
}) => {
  const allTags = group

  return (
    <Layout>
      <ContentContainer>
        <ProseContainer>
          <H1>Tags</H1>
          <ul tw="flex flex-wrap justify-around">
            {allTags.map(tag => (
              <li key={tag.fieldValue} tw="mt-6 flex-grow flex-basis[25%]">
                <Link
                  to={`/tags/${kebabCase(tag.fieldValue)}/`}
                  tw="underline font-medium hover:(bg-pink-600 text-white cursor-pointer)"
                >
                  {tag.fieldValue} ({tag.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        </ProseContainer>
      </ContentContainer>
    </Layout>
  )
}

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(limit: 2000) {
      group(field: fields___tagsFormatted) {
        fieldValue
        totalCount
      }
    }
  }
`
