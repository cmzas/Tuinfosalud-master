import React from 'react'

import Layout from '../components/layout'
import BlogListHome from '../components/blog-list-home'
import Carousel from '../components/carousel'
import Feed from '../components/feed'
import SEO from '../components/seo'

const HomePage = () => {
  return (
    <Layout>
      <SEO />
      <Carousel home />
      <BlogListHome title='Otros artículos interesantes' />
      <Feed home title="Recomendados por los editores" />
    </Layout>
  )
}

export default HomePage
