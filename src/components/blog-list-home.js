import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"

import PostCard from "./post-card"
import { formatSlug } from "../util/formatSlug"
import { formatDateToSpanish } from "../util/formatDate"

const PostMaker = ({ principalPost, posts, title: titleSection }) => {
  const { slug, title, date, featuredImage, slugPrefix } = principalPost
  return (
    <section className="home-posts">
      <h2 className="title-posts">{titleSection}</h2>
      <div className="grid-posts">
        <div className="principal-post">
          <Link to={formatSlug(slug, slugPrefix)}>
            {featuredImage ? <img src={featuredImage.childImageSharp.fluid.src} alt={title} /> : ""}
            <section className="principal-post-info">
              <span>Trending</span>
              <h1>{title}</h1>
              <p>{formatDateToSpanish(date)}</p>
            </section>
          </Link>
        </div>
        {posts.splice(1, 5)}
      </div>
    </section>
  )
}

export default function BlogListHome(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { template: { in: ["blog-post", "recipe-post"] } } }
            limit: 5
          ) {
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
      `}
      render={data => {
        const posts = data.allMarkdownRemark.edges
          .filter(edge => !!edge.node.frontmatter.date)
          .map(edge => <PostCard key={edge.node.id} data={edge.node} />)
        return <PostMaker principalPost={data.allMarkdownRemark.edges[0].node.frontmatter} posts={posts} {...props} />
      }}
    />
  )
}
