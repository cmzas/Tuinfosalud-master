import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Carousel from "../components/carousel"

import Timer from "../assets/images/timer.png"
import Serving from "../assets/images/serving.png"

import { formatSlugAuthor, formatSlugCategory } from "../util/formatSlug"
import { getStructuredData } from "../util/formatToStructuredData"
const Recipe = ({ data, pageContext }) => {
  const { authors, categories } = pageContext
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, excerpt } = markdownRemark

  const Image = frontmatter.featuredImage ? frontmatter.featuredImage.childImageSharp.fluid : ""
  const {
    title,
    description,
    date,
    authorName,
    authorSlug,
    nutrition,
    ingredients,
    prepSteps,
    categoryName,
    categorySlug,
    subCategory,
    recipeTitle,
  } = frontmatter

  const ingredientList = ingredients.split("\\").map(i => i.trim())
  const prepStepList = prepSteps.split("\\").map(i => i.trim())

  frontmatter.ingredientList = ingredientList
  frontmatter.prepStepList = prepStepList
  const structuredData = getStructuredData(frontmatter)

  return (
    <Layout className="page">
      <SEO
        title={title}
        description={description ? description : excerpt}
        image={Image.src}
        article={true}
        structuredData={structuredData}
      />
      <article className="blog-post">
        {/* <div className='blog-post-ad' /> */}
        <section className="article">
          <header className="blog-post-header">
            <p>
              {/* {categoriztion && (
                <>
                  <span>Artículo verificado</span>・
                </>
              )} */}
              {categoryName && (
                <Link to={formatSlugCategory(categoryName, categories)} className="large-text">
                  {categoryName}
                </Link>
              )}
              - {subCategory ? subCategory : ""}
            </p>
            <h1>{title}</h1>
            <p className="personal-info large-text">
              {authorName && (
                <>
                  Escrito por{" "}
                  <Link to={formatSlugAuthor(authorName, authors)} className="large-text">
                    {authorName}
                  </Link>
                  ・
                </>
              )}
              {/* {reviewedBy && (
                <>
                  Revisado por{' '}
                  <Link to={formatSlugAuthor(reviewedBy)} className='large-text'>
                    {reviewedBy}
                  </Link>
                  ・
                </>
              )} */}
              {date && <time>{date}</time>}
            </p>
          </header>
          {Image ? (
            <Img fluid={Image} objectFit="cover" objectPosition="50% 50%" alt={title + " - Featured image"} className="featured-image" />
          ) : (
            ""
          )}
          <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: html }} />
          <div className="recipe__stats">
            <h3 className="recipe__stats__title">{recipeTitle}</h3>
            <div className="recipe__stats__body">
              <img src={Timer} alt="Timer icon" />
              <span>{`${nutrition.totalTime}m`}</span>

              <img className="right-image" src={Serving} alt="Serving icon" />
              <span>{`${nutrition.servings} servings`}</span>
            </div>
          </div>
          <div className="recipe__ingredients">
            <h3 className="recipe__stats__title">Ingredientes</h3>
            <ul>
              {ingredientList.map((ingredient, i) => {
                return <li key={i}>{ingredient}</li>
              })}
            </ul>
          </div>
          <div className="recipe__preperation">
            <h3>Preparación</h3>
            <ol>
              {prepStepList.map((step, i) => {
                return <li key={i}>{step}</li>
              })}
            </ol>
            {/* <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: prepSteps }} /> */}
          </div>
        </section>
        <div className="blog-post-sidebar" />
      </article>
      <Carousel title="También te pueden interesar" />
    </Layout>
  )
}

export default Recipe

export const pageQuery = graphql`
  query RecipePostQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 148)
      frontmatter {
        authorName
        authorSlug
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        description
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 1980, maxHeight: 768, quality: 80, srcSetBreakpoints: [350, 700, 1050, 1400]) {
              ...GatsbyImageSharpFluid
              ...GatsbyImageSharpFluidLimitPresentationSize
            }
            sizes {
              src
            }
          }
        }
        categoryName
        categorySlug
        subCategory
        tag
        recipeTitle
        ingredients
        prepSteps
        nutrition {
          calories
          servings
          prepTime
          cookTime
          totalTime
        }
      }
    }
  }
`
