const Utils = require('./utils')

let collection = null

module.exports = {
  injectDB: async (pMongo) => {
    if (!collection) {
      collection = await pMongo.client.db(process.env.CODESHIP_DB).collection('comments')
    }
  },
  indexWithCursor: async (pLead, pCursor, pMatch) => {
    const aggregate = Utils.aggregatePage(pLead)(Utils.aggregateCursor(pCursor)(pLead)(Utils.aggregateMatchObjectID(pMatch)([])))
    return await Utils.getPage(aggregate, collection)
  },
  indexWhithoutCursor: async (pLead, pMatch) => {
    return await Utils.getPage(Utils.aggregatePage(pLead)(Utils.aggregateMatchObjectID(pMatch)([])), collection)
  },
}