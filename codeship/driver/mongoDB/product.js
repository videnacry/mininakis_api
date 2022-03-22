const Page = require('./page')
const ObjectID = require('bson').ObjectID

let collection = null

module.exports = {
  injectDB: async (pMongo) => {
    if (!collection) {
      collection = await pMongo.client.db(process.env.CODESHIP_DB).collection('products')
    }
  },
  indexWithCursor: async (pLead, pCursor) => {
    const aggregate = Page.aggregate(pLead)(Page.aggregateCursor(pCursor)(pLead)([]))
    return await Page.get(aggregate, collection)
  },
  indexWhithoutCursor: async (pLead) => {
    return await Page.get(Page.aggregate(pLead)([]), collection)
  },
  showById: async (pId) => {
    return await collection.findOne({_id: ObjectID(pId)})
  }
}