'use strict'

const MyGraphQL = require('../../codeship/driver/graphQL')
const productDB = require('../../codeship/driver/mongoDB/product')
const commentDB = require('../../codeship/driver/mongoDB/comment')

module.exports = async function (fastify, opts) {
  productDB.injectDB(fastify.mongo)
  commentDB.injectDB(fastify.mongo)

  fastify.register(fastify.mercurius, {
    schema: MyGraphQL.Schema,
    resolvers: MyGraphQL.Resolver
  })
  fastify.post('/', async function (request, reply) {
    return reply.graphql(request.body.query)
  })
}
