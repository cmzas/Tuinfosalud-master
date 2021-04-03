import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import sanitizeHtml from "sanitize-html"
import ProgressBar from "react-scroll-progress-bar"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useLocation } from "@reach/router"
import Carousel from "../components/carousel"
import SimilarPostsCarousel from "../components/similarPostsCarousel"
import { formatSlugAuthor, formatSlugCategory, formatSlugExpert } from "../util/formatSlug"
import { similarCategoryPosts } from "../util/similarCategoryPosts"
import { generateTableOfContent } from "../util/table-of-content"
import { openLinksNewTab } from "../util/openLinksNewTab"
import { formatDateToSpanish } from "../util/formatDate"
import { getPinterestImageLink, getCurrentUrl } from "../util/pinterest"
import { IconContext } from "react-icons"
import * as FaIcons from "react-icons/fa"
import { IoLogoTwitter, IoLogoInstagram, IoLogoPinterest } from "react-icons/io"
import { TiTick } from "react-icons/ti"

import { getArticleStructuredData } from "../util/formatArticleStructure"

import { findAuthorDetails } from "../util/findAuthorExpert"

const Post = ({ data, pageContext }) => {
  const { pathname } = useLocation()
  const { authors, allAuthors, categories, experts } = pageContext

  const authorDetails = findAuthorDetails(allAuthors.data.allMarkdownRemark.edges, pageContext.author)

  const { markdownRemark, authorImage } = data // data.markdownRemark holds your post data
  const { frontmatter, html, excerpt } = markdownRemark

  const articleStructuredData = getArticleStructuredData(frontmatter)

  const Image = frontmatter.featuredImage ? frontmatter.featuredImage.childImageSharp.fluid : ""
  const { title, description, date, category, categorySlug, author, authorSlug, reviewed, reviewedBy, toc } = frontmatter
  const similarPosts = similarCategoryPosts(data.allMarkdownRemark.edges, title)
  // const newData = sanitizeHtml(html).replace("<h2>", "").split("</h2>")
  // console.log("NEW DATA", newData)

  const updatedHtmlwithLinks = openLinksNewTab(html)
  const { allH2 } = generateTableOfContent(updatedHtmlwithLinks)
  let updatedhtml = updatedHtmlwithLinks
  allH2.map((h2, i) => {
    updatedhtml = updatedhtml.replace("<h2>", `<h2 id='${h2.id}' class='h2-scroll'>`)
  })

  const onClickLink = id => {
    if (window && window.document) {
      document.getElementById(id).scrollIntoView({
        behavior: "smooth",
      })
    }
  }

  console.log("UPDATED HTML", updatedhtml)

  // const pinterestData = {
  //   image: Image.src,
  //   headline: title,
  //   description: excerpt,
  //   author: author,
  //   authorImg: authorDetails.node.frontmatter.featuredImage ? authorDetails.node.frontmatter.featuredImage.childImageSharp.fluid.src : null,
  //   date: formatDateToSpanish(date),
  // }

  // const pinterestImageUrl = encodeURI(getPinterestImageLink(pinterestData))

  return (
    <Layout blogTitle={title} className="page">
      <SEO title={title} description={excerpt} image={Image.src} article={true} articleStructuredData={articleStructuredData} />
      {/* <ProgressBar height="6px" /> */}
      <article id="article" className="blog-post">
        {/* <div className='blog-post-ad' /> */}
        <section className="article">
          <header className="blog-post-header">
            <p className="blog-post-header-section1">
              {reviewed && reviewedBy && (
                <>
                  <span className="expert-circle">
                    {" "}
                    {/* <div className="circle"> */}
                    <IconContext.Provider value={{ color: "#ffffff", fontSize: "1rem" }}>
                      <Link to="/" style={{ fontSize: "1rem", pointerEvents: "none" }}>
                        <TiTick />
                      </Link>
                    </IconContext.Provider>
                    {/* </div> */}
                  </span>
                  <span className="large-text reviewed">Artículo Revisado・</span>
                </>
              )}

              {category && (
                <Link to={formatSlugCategory(category, categories)} className="large-text">
                  {category}
                </Link>
              )}
            </p>
            <h1>{title}</h1>
            <p className="personal-info large-text">
              {author && (
                <>
                  Escrito por{" "}
                  <Link to={formatSlugAuthor(author, authors)} className="large-text">
                    {author}
                  </Link>
                  ・
                </>
              )}
              {reviewed && reviewedBy && (
                <>
                  Revisado por
                  <Link to={formatSlugExpert(reviewedBy, experts)} className="large-text" style={{ marginLeft: "4px" }}>
                    {reviewedBy}
                  </Link>
                  ・
                </>
              )}

              {date && <time>{formatDateToSpanish(date)}</time>}
            </p>
          </header>
          {Image ? (
            <Img fluid={Image} objectFit="cover" objectPosition="50% 50%" alt={title + " - Featured image"} className="featured-image" />
          ) : (
            ""
          )}
          {toc ? (
            <div className="table-of-content" style={{ paddingTop: "30px" }}>
              <h3>Tabla de contenido</h3>
              <div className="toc_links">
                {allH2
                  ? allH2.map(h2 => {
                      return (
                        <li key={h2.title} style={{ listStyleType: "none", cursor: "pointer" }}>
                          <a onClick={() => onClickLink(h2.id)}>
                            <u>{h2.title}</u>
                          </a>
                        </li>
                      )
                    })
                  : null}
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: updatedhtml }} />
        </section>
        <div className="blog-post-sidebar" />
      </article>
      <SimilarPostsCarousel title="También te pueden interesar" data={similarPosts} />

      {/* <img style={{ display: "none" }} src={pinterestImageUrl} data-pin-description={excerpt} data-pin-url={getCurrentUrl(pathname)} /> */}
    </Layout>
  )
}

export default Post

export const pageQuery = graphql`
  query BlogPostQuery($id: String!, $category: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 148)
      frontmatter {
        author
        authorSlug
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        toc
        description
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 1980, maxHeight: 768, quality: 80, srcSetBreakpoints: [350, 700, 1050, 1400]) {
              ...GatsbyImageSharpFluid
            }
            sizes {
              src
            }
          }
        }
        author
        category
        categorySlug
        reviewed
        reviewedBy
      }
    }
    allMarkdownRemark(filter: { frontmatter: { category: { eq: $category } } }, limit: 12) {
      edges {
        node {
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            category
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 250, maxHeight: 180, quality: 80) {
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
