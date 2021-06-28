const slugify = require("slugify")
module.exports = title => {
  const cleaned = slugify(title, { lower: true, remove: /[.md].*$/ })
  return `/blog/posts/${cleaned}`
}
