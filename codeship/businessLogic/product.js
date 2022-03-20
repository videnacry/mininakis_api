const Product = require('../driver/mongoDB/product')
const getterPage = require('./middleware/getterPage')
const Utils = require('./utils')

module.exports = {
    query: async ({pId, pCreatedAt, pFirst, pLast, pAfter, pBefore}) => {
        try {
            const getPage = getterPage({pId, pCreatedAt, pFirst, pLast, pAfter, pBefore})
            return await getPage(Product.indexWithCursor, Product.indexWhithoutCursor)
        } catch (e) {
            return e
        }
    }
}