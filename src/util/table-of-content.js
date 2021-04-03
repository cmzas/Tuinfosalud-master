import sanitizeHtml from "sanitize-html"

export const generateTableOfContent = html => {
  // let newHtml = sanitizeHtml(html)
  let newHtml = html
  const allH2 = getAllH2(newHtml)

  return { allH2 }
}

const getAllH2 = html => {
  const allH2 = []
  sanitizeHtml(html, {
    // allowedTags: ["picture"],
    disallowedTagsMode: "recursiveEscape",
    exclusiveFilter: function (frame) {
      if (frame.tag === "h2") {
        //  e.log("FRAME", frame)
        const sanitizedUrl = frame.text.split(" ").join("-")
        allH2.push({ id: sanitizedUrl, title: frame.text })
      }
    },
  })

  return allH2
}
