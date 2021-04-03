import React from "react"
import { graphql } from "gatsby"
import { IoLogoTwitter, IoLogoInstagram, IoLogoPinterest, IoLogoLinkedin } from "react-icons/io"
import WebsiteIcon from "../assets/images/website-icon.png"
import { IconContext } from "react-icons"
import Layout from "../components/layout"
import BlogList from "../components/blog-list"
import SEO from "../components/seo"
import AuthorImage from "./person.png"
import { findAuthorDetails } from "../util/findAuthorExpert"
import variables from "../assets/scss/abstracts/_variables.scss"
export const pageQuery = graphql`
  query AuthorListQuery($author: String!) {
    allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }, filter: { frontmatter: { author: { eq: $author } } }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            slugPrefix
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

const AuthorPage = ({ data, pageContext }) => {
  const { edges } = data.allMarkdownRemark
  const { author, allAuthors } = pageContext
  const authorDetails = findAuthorDetails(allAuthors.data.allMarkdownRemark.edges, author)

  const authorImage = authorDetails.node.frontmatter.featuredImage
    ? authorDetails.node.frontmatter.featuredImage.childImageSharp.fluid.src
    : null
  // console.log("PAGE CONTESX", pageContext)
  // console.log("AUTHOR", author)
  // console.log("EDGES", edges)
  return (
    <Layout className="blog-page">
      <SEO title={`${author}'s Posts`} description={`${author}'s Posts`} />
      <div className="author_expert_container">
        <div className="author_expert_left">
          <div className="author_expert_image">
            <img src={authorImage ? authorImage : AuthorImage} />
          </div>
          <div className="author_expert_detail">
            <span className="author_expert_total_posts">{edges && edges.length} ARTICULOS</span>
            <span>
              <h1 className="author_expert_name">{author && author}</h1>
            </span>
            <div className="author_expert_social_links">
              {authorDetails.node.frontmatter.authorTwitterURL && (
                <div>
                  <IconContext.Provider value={{ color: variables.expertAuthorIconColor, size: "18px" }}>
                    <a href={authorDetails.node.frontmatter.authorTwitterURL} target="_blank">
                      <IoLogoTwitter />
                    </a>
                  </IconContext.Provider>
                </div>
              )}
              {authorDetails.node.frontmatter.authorInstagramURL && (
                <div>
                  <IconContext.Provider value={{ color: variables.expertAuthorIconColor, size: "18px" }}>
                    <a href={authorDetails.node.frontmatter.authorInstagramURL} target="_blank">
                      <IoLogoInstagram />
                    </a>
                  </IconContext.Provider>
                </div>
              )}

              {authorDetails.node.frontmatter.authorLinkedInURL && (
                <div>
                  <IconContext.Provider value={{ color: variables.expertAuthorIconColor, size: "18px" }}>
                    <a href={authorDetails.node.frontmatter.authorLinkedInURL} target="_blank">
                      <IoLogoLinkedin />
                    </a>
                  </IconContext.Provider>
                </div>
              )}
              {authorDetails.node.frontmatter.authorWebsiteURL && (
                <div>
                  <IconContext.Provider value={{ color: variables.expertAuthorIconColor }}>
                    <a href={authorDetails.node.frontmatter.authorWebsiteURL} target="_blank">
                      <img style={{ width: "18px", height: "18px", marginBottom: "0" }} src={WebsiteIcon} />
                    </a>
                  </IconContext.Provider>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="author_expert_right">
          <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: authorDetails.node.html }} />
          <h2>Todos los articulos</h2>
        </div>
      </div>
      {/* <h2>Lista de artículos de {author} </h2> */}

      <BlogList data={edges} />
    </Layout>
  )
}

export default AuthorPage
