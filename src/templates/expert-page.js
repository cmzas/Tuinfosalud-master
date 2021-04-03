import React from "react"
import { graphql } from "gatsby"
import { IoLogoTwitter, IoLogoInstagram, IoLogoPinterest, IoLogoLinkedin } from "react-icons/io"
import { IconContext } from "react-icons"
import WebsiteIcon from "../assets/images/website-icon.png"
import Layout from "../components/layout"
import BlogList from "../components/blog-list"
import SEO from "../components/seo"
import AuthorImage from "./person.png"
import { findExpertDetails } from "../util/findAuthorExpert"
import variables from "../assets/scss/abstracts/_variables.scss"

export const pageQuery = graphql`
  query ExpertListQuery($expert: String!) {
    allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }, filter: { frontmatter: { reviewedBy: { eq: $expert } } }) {
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

const ExpertPage = ({ data, pageContext }) => {
  const { edges } = data.allMarkdownRemark
  const { expert, allExperts } = pageContext
  const expertDetails = findExpertDetails(allExperts.data.allMarkdownRemark.edges, expert)

  const expertImage = expertDetails.node.frontmatter.featuredImage
    ? expertDetails.node.frontmatter.featuredImage.childImageSharp.fluid.src
    : null

  return (
    <Layout className="blog-page">
      <SEO title={`${expert}'s Posts`} description={`${expert}'s Posts`} />
      <div className="author_expert_container">
        <div className="author_expert_left">
          <div className="author_expert_image">
            <img src={expertImage ? expertImage : AuthorImage} />
          </div>
          <div className="author_expert_detail">
            <span className="author_expert_total_posts">{edges && edges.length} ARTICULOS</span>
            <span>
              <h1 className="author_expert_name">{expert && expert}</h1>
            </span>
            <div className="author_expert_social_links">
              {expertDetails.node.frontmatter.expertTwitterURL && (
                <div>
                  <IconContext.Provider value={{ color: variables.expertAuthorIconColor, size: "18px" }}>
                    <a href={expertDetails.node.frontmatter.expertTwitterURL} target="_blank">
                      <IoLogoTwitter />
                    </a>
                  </IconContext.Provider>
                </div>
              )}
              {expertDetails.node.frontmatter.expertInstagramURL && (
                <div>
                  <IconContext.Provider value={{ color: variables.expertAuthorIconColor, size: "18px" }}>
                    <a href={expertDetails.node.frontmatter.expertInstagramURL} target="_blank">
                      <IoLogoInstagram />
                    </a>
                  </IconContext.Provider>
                </div>
              )}

              {expertDetails.node.frontmatter.expertLinkedInURL && (
                <div>
                  <IconContext.Provider value={{ color: variables.expertAuthorIconColor, size: "18px" }}>
                    <a href={expertDetails.node.frontmatter.expertLinkedInURL} target="_blank">
                      <IoLogoLinkedin />
                    </a>
                  </IconContext.Provider>
                </div>
              )}
              {expertDetails.node.frontmatter.expertWebsiteURL && (
                <div>
                  <IconContext.Provider value={{ color: variables.expertAuthorIconColor }}>
                    <a href={expertDetails.node.frontmatter.expertWebsiteURL} target="_blank">
                      <img style={{ width: "18px", height: "18px", marginBottom: "0" }} src={WebsiteIcon} />
                    </a>
                  </IconContext.Provider>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="author_expert_right">
          <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: expertDetails.node.html }} />
          <h2>Todos los especialistas</h2>
        </div>
      </div>
      {/* <h2>Lista de especialista de {expert} </h2> */}
      <BlogList data={edges} />
    </Layout>
  )
}

export default ExpertPage
