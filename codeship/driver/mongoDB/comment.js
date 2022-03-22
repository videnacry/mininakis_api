const Page = require('./page')

let collection = null

module.exports = {
  injectDB: async (pMongo) => {
    if (!collection) {
      collection = await pMongo.client.db(process.env.CODESHIP_DB).collection('comments')
    }
  },
  indexWithCursor: (pProduct) => {
    return async(pLead, pCursor) => {
      const aggregate = Page.aggregate(pLead)(Page.aggregateCursor(pCursor)(pLead)(Page.aggregateMatchObjectID({product:pProduct})([])))
      return await Page.get(aggregate, collection)
    }
  },
  indexWhithoutCursor: (pProduct) => {
    return async (pLead) => await Page.get(Page.aggregate(pLead)(Page.aggregateMatchObjectID({product:pProduct})([])), collection)
  },
}