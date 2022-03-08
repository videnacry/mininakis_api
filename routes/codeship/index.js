'use strict'
const utils = require('./utils')

module.exports = async function (fastify, opts) {
  const schema = `
    type Cursor {
      _id:String,
      createdAt:String
    }
    type PageInfo {
      hasNextPage:Boolean,
      hasPreviousPage:Boolean,
      startCursor:Cursor,
      endCursor:Cursor
    }
    type Product {
      _id:String,
      title:String,
      description:String,
      price:Int,
      type:String,
      file_path:String,
      img_path:String,
      createdAt:String
    }
    type ProductEdge {
      node:Product
      cursor:Cursor
    }
    type ProductsConnection {
      edges:[ProductEdge],
      pageInfo:PageInfo!
    }
    type Query {
      products(pId:String, pCreatedAt:String, pFirst:Int, pLast:Int, pAfter:Int, pBefore:Int):ProductsConnection
    }
  `
  const resolvers = {
    Query: {
      products: async (_, {pId, pCreatedAt, pFirst, pLast, pAfter, pBefore}) => {
        try {

          const productsAskedTimes = {count:0}
          utils.increaseByBool(productsAskedTimes)(pFirst)(pLast)(pAfter)(pBefore);
          if (productsAskedTimes.count > 1) throw new Error('Please select only one option: pFirst, pLast, pAfter, pBefore, or non of them to get a product by pId')
          const pIdpLastpFirstAsked = {count:0}
          utils.increaseByBool(pIdpLastpFirstAsked)(pFirst)(pLast)(pId)
          if (pIdpLastpFirstAsked.count > 1) throw new Error('Please to use pId make sure not to use pFirst or pLast')
          if (productsAskedTimes.count === 0 && pIdpLastpFirstAsked.count === 0) throw new Error('Please use at least one of the options: pFirst, pLast, or pId, or: pAfter, pBefore with the cursor: pId, pCreatedAt')

          const productsPromises = []
          let aggregate = []

          
          let cursorDirection
          if (productsAskedTimes.count === 0 && pId) {
            aggregate.push({$match: {_id: fastify.mongo.ObjectId(pId)}})
            cursorDirection = {sort: 1, limit: 1}
          }
          if (pAfter || pFirst) cursorDirection = {_id: "$gt", createdAt: "$gte", sort: 1, limit: pAfter|pFirst}
          if (pBefore || pLast) cursorDirection = {_id: "$lt", createdAt: "$lte", sort: -1, limit: pBefore|pLast}
          
          if (pAfter || pBefore) {
            if (pAfter > 40 || pBefore > 40) throw new Error('pAfter, pBefore, pLast and pFirst values must be less then 40')
            if (!pId || !pCreatedAt) throw new Error('Please to use pAfter or pBefore, you must also use pCursor')

            const matchCursor = {
              $match: {
                _id: {[cursorDirection._id]: fastify.mongo.ObjectId(pId)},
                createdAt: {[cursorDirection.createdAt]: new Date(Number.parseInt(pCreatedAt))}
              }
            }
            aggregate.push(matchCursor)
          }
          aggregate = [
            ...aggregate,
            {$sort: {createdAt: cursorDirection.sort, _id: cursorDirection.sort}},
            {$limit: cursorDirection.limit},
            {$bucketAuto: {
              groupBy: '$_id',
              buckets: 1,
              output: {totalCount: {$sum: 1}, edges: {$push: {node: "$$ROOT", cursor: {_id: "$_id", createdAt: "$createdAt"}}}}
            }},
          ]
          productsPromises.push(fastify.mongo.db.collection('products').aggregate([{$sort:{createdAt:1, _id:1}},{$limit:1},{$project:{_id:1}},{$addFields:{isFirst:true}}]).toArray())
          productsPromises.push(fastify.mongo.db.collection('products').aggregate([{$sort:{createdAt:-1, _id:-1}},{$limit:1},{$project:{_id:1}},{$addFields:{isLast:true}}]).toArray())
          productsPromises.push(fastify.mongo.db.collection('products').aggregate(aggregate).toArray())

          const results = await Promise.all(productsPromises)
          const products = {}
          results.map(result => {
            if (result[0].isFirst) products.firstOne = result[0]
            else if (result[0].isLast) products.lastOne = result[0]
            else {
              const startCursor = result[0].edges[0].cursor
              const endCursor = result[0].edges[result[0].totalCount - 1].cursor
              result[0].pageInfo = {
                hasNextPage: !endCursor._id.equals(products.lastOne._id),
                hasPreviousPage: !startCursor._id.equals(products.firstOne._id),
                startCursor,
                endCursor
              }
              products.page = result[0]
            }
          })
          return products.page
        } catch (e) {
          return e
        }
      }
    }
  }
  fastify.register(fastify.mercurius, {
    schema,
    resolvers
  })
  fastify.post('/', async function (request, reply) {
    return reply.graphql(request.body.query)
  })
}
