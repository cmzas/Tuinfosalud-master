import sanitizeHtml from "sanitize-html"
import siteData from "../util/site.json"
export const openLinksNewTab = html => {
  const { siteUrl } = siteData.meta
  const updatedHtml = sanitizeHtml(html, {
    transformTags: {
      a: function (tagName, attribs) {
        if (attribs.href && attribs.href.includes(siteUrl)) {
          return {
            tagName: "a",
            attribs: {
              href: attribs.href,
            },
          }
        }
        return {
          tagName: "a",
          attribs: {
            href: attribs.href,
            target: "_blank",
          },
        }
      },
    },
  })
  // const updatedHtml = sanitizeHtml(html, {
  //   transformTags: {
  //     a: sanitizeHtml.simpleTransform("a", { target: "_blank" }),
  //   },
  // })

  return updatedHtml
  // const allLinks = getAllLinks(html)

  // allLinks.map((link, i) => {
  //   newHtml = newHtml.replace("<h2>", `<h2 id='${h2.id}' class='h2-scroll'>`)
  // })
  // console.log("UPDATED HTML", newHtml)
}

// const getAllLinks = html => {
//   const { siteUrl } = siteData.meta
//   const allLinks = []
//   sanitizeHtml(html, {
//     textFilter: function (text, tagName) {
//       if (["a"].indexOf(tagName) > -1) {
//         if (text.includes(siteUrl)) {
//         }
//       }
//     },
//   })

//   return allLinks
// }
