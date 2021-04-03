import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { formatSlug } from "../util/formatSlug"

const SimilarPostsCarousel = ({ data, title = "", home = false }) => {
  return (
    <section className="carousel">
      {title && (
        <section className="carousel-title">
          <h2>{title}</h2>
        </section>
      )}

      <section className="carousel-list">
        {data.map(element => {
          const { date, slug, title, featuredImage } = element.node.frontmatter

          return (
            <article key={slug} className="carousel-card">
              <Link to={formatSlug(slug)}>
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
                <p>{date}</p>
              </Link>
            </article>
          )
        })}
      </section>
    </section>
  )
}

export default SimilarPostsCarousel
