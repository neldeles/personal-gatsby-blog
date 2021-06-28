const slugify = require("slugify")
module.exports = title =>
  `/blog/posts/${slugify(title, { lower: true, remove: /\|.*$/ })}`
