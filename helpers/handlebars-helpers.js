const helpers = require('handlebars-helpers')
const multihelpers = helpers()

module.exports = {
  ifCond: function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this)
  }, multihelpers
}
