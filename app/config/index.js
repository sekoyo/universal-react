/* globals ENVIRONMENT */
/* eslint-disable global-require */
if (ENVIRONMENT === 'production') {
  module.exports = require('./production');
} else {
  module.exports = require('./default');
}
