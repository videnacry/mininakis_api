'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async function dbConnector (fastify, options) {
  const url = (process.env.MODE === 'TEST') ? process.env.TEST_CODESHIP_URL_MONGODB : process.env.PROD_CODESHIP_URL_MONGODB
  fastify.register(require('fastify-mongodb'), {
    url
  })
})