import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"

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
        excerpt(pruneLength: 250)
        frontmatter {
          title
          date
        }
        fields {
          slug
        }
      }
    }
  }
`

const IndexPage = ({ data }) => (
  <Layout>
    {
      <div>
        <div>
          <h1>{data.site.siteMetadata.title}</h1>
          <p>{data.site.siteMetadata.description}</p>
        </div>

        <div>
          {data.allMdx.nodes.map(({ excerpt, frontmatter, fields }) => (
            <div>
              <Link to={fields.slug}>
                <h1>{frontmatter.title}</h1>
              </Link>
              <p>{frontmatter.date}</p>
              <p>{excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    }
  </Layout>
)

export default IndexPage
