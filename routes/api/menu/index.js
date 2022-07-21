'use strict'

module.exports = async function (app, opts) {
  app.register(require('./update'))
  app.register(require('./delete'))
  app.register(require('./create'))
}