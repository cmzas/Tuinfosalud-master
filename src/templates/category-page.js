import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import BlogList from "../components/blog-list"
import SEO from "../components/seo"

export const pageQuery = graphql`
  query CategoryListQuery($category: String!) {
    allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }, filter: { frontmatter: { category: { eq: $category } } }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            description
            category
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 540, maxHeight: 360, quality: 80) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

const CategoryPage = ({ data, pageContext }) => {
  const { edges } = data.allMarkdownRemark
  const { category } = pageContext

  return (
    <Layout className="blog-page">
      <SEO title={`${category} Posts`} description={`${category} Posts`} />
      <h2>Lista de artículos de {category} </h2>
      <BlogList data={edges} />
    </Layout>
  )
}

export default CategoryPage
