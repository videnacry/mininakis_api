const Comment = require('../driver/mongoDB/comment')
const getterPageByIndex = require('./middleware/getterPageByIndex')
const Utils = require('./utils')

module.exports = {
    index: async ({pId, pCreatedAt, pProduct, pFirst, pLast, pAfter, pBefore}) => {
        if (!pProduct) return new Error('Please give an ObjectID string to pProduct, value required')
        const getPage = getterPageByIndex({pId, pCreatedAt, pFirst, pLast, pAfter, pBefore})
        return await getPage(Comment.indexWithCursor(pProduct), Comment.indexWhithoutCursor(pProduct))
    }
}