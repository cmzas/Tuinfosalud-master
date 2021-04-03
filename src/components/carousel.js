import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { formatSlug } from "../util/formatSlug"
import { formatDateToSpanish } from "../util/formatDate"
const Carousel = ({ data, title = "", home = false }) => {
  const { edges } = data.allMarkdownRemark
  return (
    <section className="carousel">
      {title && (
        <section className="carousel-title">
          <h2>{title}</h2>
        </section>
      )}

      <section className="carousel-list">
        {(home ? edges.slice(0, 4) : edges).map(element => {
          const { date, slug, title, featuredImage, slugPrefix } = element.node.frontmatter

          return (
            <article key={slug} className="carousel-card">
              <Link to={formatSlug(slug, slugPrefix)}>
                {featuredImage ? (
                  <Img
                    fluid={featuredImage.childImageSharp.fluid}
                    objectFit="cover"
                    objectPosition="50% 50%"
                    alt={title + " - Featured image"}
                    className="featured-image"
                  />
                ) : (
                  ""
                )}
                <h3>{title}</h3>
                <p>{formatDateToSpanish(date)}</p>
              </Link>
            </article>
          )
        })}
      </section>
    </section>
  )
}

const CarouselWithQuery = (props, home = false) => (
  <StaticQuery
    query={graphql`
      query CarouselQuery {
        allMarkdownRemark(
          limit: 12
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { template: { in: ["blog-post", "recipe-post"] } } }
        ) {
          edges {
            node {
              frontmatter {
                date(formatString: "MMMM DD, YYYY")
                slug
                slugPrefix
                title
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
    `}
    render={data => <Carousel data={data} {...props} />}
  />
)

export default CarouselWithQuery
