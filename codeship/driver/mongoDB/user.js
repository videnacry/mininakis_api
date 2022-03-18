const Utils = require('./utils')

let collection = null

module.exports = {
  injectDB: async (pMongo) => {
    if (!collection) {
      collection = await pMongo.client.db(process.env.CODESHIP_DB).collection('users')
    }
  },
  indexWithCursor: async (pLead, pCursor) => {
    const aggregate = Utils.aggregatePage(pLead)(Utils.aggregateCursor(pCursor)(pLead)([]))
    return await Utils.getPage(aggregate, collection)
  },
  indexWhithoutCursor: async (pLead) => {
    return await Utils.getPage(Utils.aggregatePage(pLead)([]), collection)
  },
}