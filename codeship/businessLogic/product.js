const Product = require('../driver/mongoDB/product')
const getterElementById = require('./middleware/getterElementById')
const getterPageByIndex = require('./middleware/getterPageByIndex')
const Utils = require('./utils')

module.exports = {
    index: async ({pId, pCreatedAt, pFirst, pLast, pAfter, pBefore}) => {
        const getPage = getterPageByIndex({pId, pCreatedAt, pFirst, pLast, pAfter, pBefore})
        return await getPage(Product.indexWithCursor, Product.indexWhithoutCursor)
    },
    show: async ({pId}) => {
        const getElementById = getterElementById({pId})
        return await getElementById(Product.showById)
    }
}