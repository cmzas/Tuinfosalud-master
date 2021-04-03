export const findAuthorDetails = (allAuthors, authorName) => {
  let authorDetails
  const authourFound = allAuthors.map(author => {
    if (author.node.frontmatter.authorName === authorName) {
      authorDetails = author
    }
  })
  return authorDetails
}

export const findExpertDetails = (allExperts, expertName) => {
  let expertDetails
  const expertFound = allExperts.map(expert => {
    if (expert.node.frontmatter.expertName === expertName) {
      expertDetails = expert
    }
  })
  return expertDetails
}
