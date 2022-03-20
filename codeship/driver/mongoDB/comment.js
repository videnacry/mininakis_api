const Utils = require('./utils')

let collection = null

module.exports = {
  injectDB: async (pMongo) => {
    if (!collection) {
      collection = await pMongo.client.db(process.env.CODESHIP_DB).collection('comments')
    }
  },
  indexWithCursor: (pProduct) => {
    return async(pLead, pCursor) => {
      const aggregate = Utils.aggregatePage(pLead)(Utils.aggregateCursor(pCursor)(pLead)(Utils.aggregateMatchObjectID({product:pProduct})([])))
      return await Utils.getPage(aggregate, collection)
    }
  },
  indexWhithoutCursor: (pProduct) => {
    return async (pLead) => await Utils.getPage(Utils.aggregatePage(pLead)(Utils.aggregateMatchObjectID({product:pProduct})([])), collection)
  },
}