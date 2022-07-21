'use strict'

module.exports = async function (app, opts) {
  app.register(require('./patch'))
  app.register(require('./read'))
}