import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { formatSlug } from '../util/formatSlug'

const PostCard = ({ data }) => {
  const { slug, featuredImage, title, description } = data.frontmatter
  return (
    <Link to={formatSlug(slug)}>
      <article className='post-card'>
        {featuredImage ? (
          <Img
            fluid={featuredImage.childImageSharp.fluid}
            objectFit='cover'
            objectPosition='50% 50%'
            alt={title + ' - Featured image'}
            className='featured-image'
          />
        ) : (
          ''
        )}
        <div className='post-content'>
          <p className='category'>Trending</p>
          <h3 className='truncate-overflow'>{title}</h3>
          <p className='description truncate-overflow'>{description}</p>
        </div>
      </article>
    </Link>
  )
}

export default PostCard
