import siteData from "../util/site.json"

export const getPinterestImageLink = pinterestData => {
  const { siteUrl } = siteData.meta
  const baseUrl = "https://placid.app/u/l3ds68roj?" // placid

  const postImage = `${siteUrl}${pinterestData.image}`
  if (pinterestData.authorImg) {
    const authorImg = `${siteUrl}${pinterestData.authorImg}`
    return `${baseUrl}img=${postImage}&headline=${pinterestData.headline}&author=${pinterestData.author}&author-img=${authorImg}&date=${pinterestData.date}`
  }

  return `${baseUrl}img=${postImage}&headline=${pinterestData.headline}&author=${pinterestData.author}&date=${pinterestData.date}`
}

export const getCurrentUrl = pathname => {
  const { siteUrl } = siteData.meta
  return `${siteUrl}${pathname}`
}
