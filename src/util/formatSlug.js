import accents from "remove-accents"
export const formatSlug = (slug, slugPrefix) => {
  if (slugPrefix !== "receta/") slugPrefix = "articulos/"
  return `/${slugPrefix}${slug}`
}

export const formatSlugAuthor = (authorName, authors) => {
  let authorSlug = ""

  if (authors) {
    authors.map(author => {
      if (author.node.frontmatter.authorName === authorName) {
        authorSlug = author.node.frontmatter.authorSlug
      }
    })
  }

  // let authorSlug = authors.find(author => author.node.frontmatter.authorName == authorName)
  // console.log("AUTHOR SLUG IN FORMATTER", authorSlug)
  if (!authorSlug) authorSlug = authorName ? authorName.toLowerCase().split(" ").join("-") : ""
  const nonAccentAuthorSlug = accents.remove(authorSlug)
  return `/autor/${nonAccentAuthorSlug}`
}

export const formatSlugCategory = (categoryName, categories) => {
  let categorySlug = ""

  if (categories) {
    categories.map(category => {
      if (category.node.frontmatter.categoryName === categoryName) {
        categorySlug = category.node.frontmatter.categorySlug
      }
    })
  }

  // let categorySlug = categorys.find(author => author.node.frontmatter.authorName == authorName)
  // console.log("AUTHOR SLUG IN FORMATTER", categorySlug)
  if (!categorySlug) categorySlug = categoryName ? categoryName.toLowerCase().split(" ").join("-") : ""
  const nonAccentCategorySlug = accents.remove(categorySlug)
  return `/categoria/${nonAccentCategorySlug}`
}

export const formatSlugExpert = (expertName, experts) => {
  let expertSlug = ""

  if (experts) {
    experts.map(expert => {
      if (expert.node.frontmatter.expertName === expertName) {
        expertSlug = expert.node.frontmatter.expertSlug
      }
    })
  }

  // let categorySlug = categorys.find(author => author.node.frontmatter.authorName == authorName)
  // console.log("AUTHOR SLUG IN FORMATTER", categorySlug)
  if (!expertSlug) expertSlug = expertName ? expertName.toLowerCase().split(" ").join("-") : ""
  const nonAccentExpertSlug = accents.remove(expertSlug)
  return `/especialista/${nonAccentExpertSlug}`
}
