export const getStructuredData = data => {
  let recipeInstructions = []
  data.prepStepList.map(step => {
    recipeInstructions.push({
      "@type": "HowToStep",
      text: step,
    })
  })

  const images = data.featuredImage.childImageSharp.fluid.srcSet.split(",").map(image => image.replace(/\.[^.]+$/, ".jpg"))

  const date = new Date(data.date).toISOString().split("T")[0]

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    name: data.recipeTitle,
    image: images,
    author: {
      "@type": "Person",
      name: data.authorName,
    },
    datePublished: date,
    description: data.description,
    // recipeCuisine: 'American',
    prepTime: data.nutrition.prepTime ? `PT${data.nutrition.prepTime}M` : "",
    cookTime: data.nutrition.cookTime ? `PT${data.nutrition.cookTime}M` : "",
    totalTime: data.nutrition.totalTime ? `PT${data.nutrition.totalTime}M` : "",
    keywords: data.tag ? data.tag.join(", ") : "",
    recipeYield: data.nutrition.servings ? `${data.nutrition.servings} ${data.nutrition.servings === 1 ? "serving" : "servings"}` : "",
    recipeCategory: data.categoryName ? data.categoryName : "",
    nutrition: {
      "@type": "NutritionInformation",
      calories: data.nutrition.calories ? `${data.nutrition.calories} ${data.nutrition.calories === 1 ? "calorie" : "calories"}` : "",
    },
    // aggregateRating: {
    //   '@type': 'AggregateRating',
    //   ratingValue: '5',
    //   ratingCount: '18',
    // },
    recipeIngredient: data.ingredientList ? data.ingredientList : [],
    recipeInstructions: recipeInstructions || [],
  }

  return structuredData
}
