import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ title, description, image, article, structuredData, articleStructuredData }) => {
  const { pathname } = useLocation()

  const { site } = useStaticQuery(query)
  // console.log("STRUCTURED DATA", articleStructuredData)
  const { defaultTitle, titleTemplate, defaultDescription, siteUrl, defaultImage, twitterUsername } = site.siteMetadata

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  }
  if (seo.description && seo.description.length > 300) {
    seo.description = description.substring(0, 300)
  }

  return (
    <Helmet title={seo.title} titleTemplate={titleTemplate}>
      <html lang="en-US" />
      {/* <link rel="alternate" href={seo.url} hreflang="en-us" />
      <link rel="alternate" href={seo.url} hreflang="en" />
      <link rel="alternate" href={seo.url} hreflang="x-default" /> */}
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      {/* {seo.url && <meta property="og:url" content={seo.url} />} */}
      {seo.url && <link rel="canonical" href={seo.url} />}
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {seo.url && <link rel="canonical" href={seo.url} />}
      {seo.title && <meta property="og:title" content={seo.title} />}

      {seo.description && <meta property="og:description" content={seo.description} />}

      {seo.image && <meta property="og:image" content={seo.image} />}

      <meta name="twitter:card" content="summary_large_image" />

      {twitterUsername && <meta name="twitter:creator" content={twitterUsername} />}

      {seo.title && <meta name="twitter:title" content={seo.title} />}

      {seo.description && <meta name="twitter:description" content={seo.description} />}
      {structuredData && <script type="application/ld+json">{JSON.stringify(structuredData)}</script>}
      {articleStructuredData && <script type="application/ld+json">{JSON.stringify(articleStructuredData)}</script>}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/
font-awesome.min.css"
      ></link>
    </Helmet>
  )
}

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
}

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false,
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl: siteUrl
        defaultImage: image
        twitterUsername
      }
    }
  }
`
