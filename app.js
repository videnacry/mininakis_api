'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const config = require('./config')

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Do not touch the following lines

  // Load variables related to the mode in which the server is going to be used eg. dev, prod, test
  fastify.decorate('variables',config.getVariables())
  

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
