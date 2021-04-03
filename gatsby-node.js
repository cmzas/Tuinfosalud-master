/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")
var accents = require("remove-accents")
const { createFilePath } = require(`gatsby-source-filesystem`)
// const preOptimize = require("./scripts/pre-optimize")
const createAllPostPages = (posts, authors, allAuthors, categories, experts, actions) => {
  const { createPage } = actions

  // Create blog posts
  posts.forEach((post, index) => {
    const id = post.node.id
    const { slug, category, template, author } = post.node.frontmatter

    if (slug) {
      const upatedSlug = slug.split(" ").join("-")
      // let path
      // if (template === "blog-post") {
      //   path = `articulos/${upatedSlug}`
      // } else if (template === "recipe-post") {
      //   path = `receta/${upatedSlug}`
      // } else {
      //   path = upatedSlug
      // }
      createPage({
        path: template === "blog-post" ? `articulos/${upatedSlug}` : template === "recipe-post" ? `receta/${upatedSlug}` : upatedSlug,

        component: path.resolve(`src/templates/${String(template)}.js`),
        // additional data can be passed via context
        context: {
          id,
          category: category ? category : "category",
          allAuthors,
          author: author ? author : "author",
          authors,
          categories,
          experts,
        },
      })
    }
  })
}

const createAllAuthorsPages = (posts, allAuthors, actions) => {
  const { createPage } = actions

  const authorsFound = []
  posts.forEach(post => {
    let { authorName, authorSlug } = post.node.frontmatter
    if (authorName) {
      if (!authorSlug) authorSlug = authorName.toLowerCase().split(" ").join("-")
      const nonAccentAuthorSlug = accents.remove(authorSlug)
      authorsFound.push({ authorName, nonAccentAuthorSlug })
    }
  })

  authorsFound.forEach(authorPage => {
    createPage({
      path: `autor/${authorPage.nonAccentAuthorSlug}`,
      component: path.resolve(`src/templates/author-page.js`),
      context: {
        author: authorPage.authorName,
        allAuthors,
      },
    })
  })
}

// Create Categories Page
const createAllCategoryPages = (posts, actions) => {
  const { createPage } = actions

  const categoriesFound = []
  posts.forEach(post => {
    let { categoryName, categorySlug } = post.node.frontmatter
    if (categoryName) {
      if (!categorySlug) categorySlug = categoryName.toLowerCase().split(" ").join("-")
      const nonAccentCategorySlug = accents.remove(categorySlug)
      categoriesFound.push({ categoryName, nonAccentCategorySlug })
    }
  })

  categoriesFound.forEach(category => {
    createPage({
      path: `categoria/${category.nonAccentCategorySlug}`,
      component: path.resolve(`src/templates/category-page.js`),
      context: {
        category: category.categoryName,
      },
    })
  })
}

// Create Custom Pages
const createAllExpertPages = (posts, allExperts, actions) => {
  const { createPage } = actions

  const expertsFound = []
  posts.forEach(post => {
    let { expertName, expertSlug } = post.node.frontmatter
    if (expertName) {
      if (!expertSlug) expertSlug = expertName.toLowerCase().split(" ").join("-")
      const nonAccentExpertSlug = accents.remove(expertSlug)
      expertsFound.push({ expertName, nonAccentExpertSlug })
    }
  })

  expertsFound.forEach(expert => {
    createPage({
      path: `especialista/${expert.nonAccentExpertSlug}`,
      component: path.resolve(`src/templates/expert-page.js`),
      context: {
        expert: expert.expertName,
        allExperts,
      },
    })
  })
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  // All Posts

  // Pre-optimizing images

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            frontmatter {
              slug
              slugPrefix
              template
              title
              category
              categoryName
              categorySlug
              author
              authorName
              authorSlug
              expertName
              expertSlug
            }
          }
        }
      }
    }
  `)

  // Getting All Authors
  const allAuthors = await graphql(`
    {
      allMarkdownRemark(filter: { frontmatter: { template: { eq: "author-page" } } }) {
        edges {
          node {
            id
            html
            frontmatter {
              authorSlug
              authorName
              featuredImage {
                childImageSharp {
                  fluid(maxWidth: 200) {
                    src
                  }
                }
              }
              authorTwitterURL
              authorLinkedInURL
              authorInstagramURL
              authorWebsiteURL
            }
          }
        }
      }
    }
  `)

  // Getting All Categoires
  const allCategories = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              categorySlug
              categoryName
            }
          }
        }
      }
    }
  `)

  const allExperts = await graphql(`
    {
      allMarkdownRemark(filter: { frontmatter: { template: { eq: "expert-page" } } }) {
        edges {
          node {
            id
            html
            frontmatter {
              expertSlug
              expertName
              featuredImage {
                childImageSharp {
                  fluid(maxWidth: 200) {
                    src
                  }
                }
              }
              expertTwitterURL
              expertLinkedInURL
              expertInstagramURL
              expertWebsiteURL
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors || allAuthors.errors || allCategories.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // All posts
  const posts = result.data.allMarkdownRemark.edges

  // All Authors
  const authors = allAuthors.data.allMarkdownRemark.edges
  const filteredAuthors = removeEmptyAuthors(authors)
  // All Categories
  const categories = allCategories.data.allMarkdownRemark.edges
  const filteredCategories = removeEmptyCategories(categories)

  const experts = allExperts.data.allMarkdownRemark.edges
  const filteredExperts = removeEmptyExperts(experts)

  // Create Blog Pages
  await createAllPostPages(posts, filteredAuthors, allAuthors, filteredCategories, filteredExperts, actions)
  // Create Author Pages
  await createAllAuthorsPages(posts, allAuthors, actions)
  // Create Expert Pages
  await createAllExpertPages(posts, allExperts, actions)
  // Create Cateogory Pages
  await createAllCategoryPages(posts, actions)
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

// Helper Methods
const removeEmptyAuthors = authors => {
  const filteredAuthors = authors.filter(author => {
    return author.node.frontmatter.authorName !== null
  })

  return filteredAuthors
}

const removeEmptyCategories = categories => {
  const filteredCategories = categories.filter(category => {
    return category.node.frontmatter.categoryName !== null
  })

  return filteredCategories
}

const removeEmptyExperts = experts => {
  const filteredExperts = experts.filter(expert => {
    return expert.node.frontmatter.expertName !== null
  })

  return filteredExperts
}
