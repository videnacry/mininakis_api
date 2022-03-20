const User = require('../driver/mongoDB/user')
const getterPage = require('./middleware/getterPage')

module.exports = {
    query: async ({pId, pCreatedAt, pFirst, pLast, pAfter, pBefore}) => {
        try {
            const getPage = getterPage({pId, pCreatedAt, pFirst, pLast, pAfter, pBefore})
            return await getPage(User.indexWithCursor, User.indexWhithoutCursor)
        } catch (e) {
            return e
        }
    }
}