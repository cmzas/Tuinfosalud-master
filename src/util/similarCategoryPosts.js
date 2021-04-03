export const similarCategoryPosts = (array, title) => {
  //   let oldArray = arr
  //   console.log("OLD ARRAY", oldArray)
  //   const newArray = oldArray.filter(i => i.node.frontmatter.title !== title)
  //   console.log("NEW ARRAY", newArray)
  //   const shuffledArray = shuffle(newArray)
  //   if (shuffledArray.length < 12) return shuffledArray
  //   return shuffledArray.splice(0, 12)
  // }

  // function shuffle(a) {
  //   for (let i = a.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1))
  //     ;[a[i], a[j]] = [a[j], a[i]]
  //   }
  //   return a
  // }

  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }

  return array
}
