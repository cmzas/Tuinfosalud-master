import React, { Component } from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import InfiniteScroll from "react-infinite-scroller"
import Img from "gatsby-image"
import { formatSlug } from "../util/formatSlug"
import { formatDateToSpanish } from "../util/formatDate"
class Feed extends Component {
  state = {
    postsToShow: [],
    hasMore: true,
    initialLoad: true,
    startingItem: 0,
    endingItem: 20,
  }

  fetchMoreData = () => {
    const { edges } = this.props.data.allMarkdownRemark
    const { startingItem, endingItem, postsToShow } = this.state
    let updatedPosts = []
    if (endingItem > edges.length) {
      this.setState({ ...this.state, hasMore: false, endingItem: edges.length }, () => {
        updatedPosts = [...postsToShow.concat(edges.slice(startingItem, endingItem))]
        setTimeout(() => {
          this.setState({
            ...this.state,
            postsToShow: updatedPosts,
            startingItem: startingItem,
            endingItem: endingItem,
          })
        }, 500)
      })
    } else {
      updatedPosts = [...postsToShow.concat(edges.slice(startingItem, endingItem))]
      setTimeout(() => {
        this.setState({
          ...this.state,
          postsToShow: updatedPosts,
          startingItem: startingItem + 20,
          endingItem: endingItem + 20,
          initialLoad: false,
        })
      }, 500)
    }
  }

  render() {
    const { title } = this.props
    const { postsToShow, initialLoad, hasMore } = this.state
    const loader = <p className="loader">Loading...</p>
    return (
      <section className="carousel">
        {title && (
          <section className="carousel-title">
            <h2>{title}</h2>
          </section>
        )}

        <InfiniteScroll pageStart={0} initialLoad={initialLoad} loadMore={this.fetchMoreData.bind(this)} hasMore={hasMore} loader={loader}>
          <section className="carousel-list">
            {postsToShow &&
              postsToShow.map(element => {
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
        </InfiniteScroll>
      </section>
    )
  }
}

const FeedWithQuery = (props, home = false) => (
  <StaticQuery
    query={graphql`
      query FeedQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { template: { in: ["blog-post", "recipe-post"] } } }
          limit: 50
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
    render={data => <Feed data={data} {...props} />}
  />
)

export default FeedWithQuery
