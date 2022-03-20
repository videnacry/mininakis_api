const Comment = require('../driver/mongoDB/comment')
const getterPage = require('./middleware/getterPage')
const Utils = require('./utils')

module.exports = {
    query: async ({pId, pCreatedAt, pProduct, pFirst, pLast, pAfter, pBefore}) => {
        try {
            if (!pProduct) throw new Error('Please give an ObjectID string to pProduct, value required')

            const getPage = getterPage({pId, pCreatedAt, pFirst, pLast, pAfter, pBefore})
            return await getPage(Comment.indexWithCursor(pProduct), Comment.indexWhithoutCursor(pProduct))
        } catch (e) {
            return e
        }
    }
}