import React from 'react'
// import { graphql } from 'gatsby'

import Layout from '../components/layout'
// import BlogList from '../components/blog-list'
import SEO from '../components/seo'

// export const pageQuery = graphql`
//   query AuthorListQuery($author: String!) {
//     allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }, filter: { frontmatter: { author: { eq: $author } } }) {
//       edges {
//         node {
//           id
//           excerpt(pruneLength: 250)
//           frontmatter {
//             date(formatString: "MMMM DD, YYYY")
//             slug
//             title
//             description
//             category
//             featuredImage {
//               childImageSharp {
//                 fluid(maxWidth: 540, maxHeight: 360, quality: 80) {
//                   ...GatsbyImageSharpFluid
//                   ...GatsbyImageSharpFluidLimitPresentationSize
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `

const TagPage = ({ data, pageContext }) => {
  //   const { edges } = data.allMarkdownRemark
  //   const { author } = pageContext

  return (
    <Layout className='blog-page'>
      <SEO title={` Posts`} description={` Posts`} />
      <h2>Lista de artículos de Categoria </h2>
      {/* <BlogList data={edges} /> */}
    </Layout>
  )
}

export default TagPage
