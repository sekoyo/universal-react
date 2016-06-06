if (__ENVIRONMENT__ === 'production') {
  module.exports = require('./production')
} else {
  module.exports = require('./default')
}
