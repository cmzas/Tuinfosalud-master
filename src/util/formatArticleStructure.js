import siteData from "./site.json"
export const getArticleStructuredData = data => {
  const { siteUrl, title, image } = siteData.meta
  // console.log(siteUrl, "Site URL")
  const images = data.featuredImage.childImageSharp.fluid.srcSet.split(",").map(image => {
    return `${siteUrl}${image}`.replace(/\.[^.]+$/, ".jpg")
  })

  const date = new Date(data.date).toISOString()
  const modifiedDate = data.modifiedDate
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "NewsArticle",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/articulos/${data.slug}`,
    },
    headline: data.title,
    image: images,
    author: {
      "@type": "Person",
      name: data.author,
    },
    datePublished: date,
    dateModified: modifiedDate ? new Date(data.modifiedDate).toISOString() : date,
    publisher: {
      "@type": "Organization",
      name: title,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}${image}`,
      },
    },
  }

  return structuredData
}
