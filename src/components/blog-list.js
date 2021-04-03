import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { formatSlug } from "../util/formatSlug"
import { formatDateToSpanish } from "../util/formatDate"
const BlogList = ({ data }) => {
  return (
    <div className="blog-list" style={{ paddingTop: "24px" }}>
      {data.map(post => {
        const { slug, featuredImage, title, date } = post.node.frontmatter
        return (
          <Link key={slug} to={formatSlug(slug)}>
            <article>
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
            </article>
          </Link>
        )
      })}
    </div>
  )
}

export default BlogList
