const User = require('../driver/mongoDB/user')
const getterPageByIndex = require('./middleware/getterPageByIndex')
const getterElementById = require('./middleware/getterElementById')

module.exports = {
    index: async ({pId, pCreatedAt, pFirst, pLast, pAfter, pBefore}) => {
        const getPage = getterPageByIndex({pId, pCreatedAt, pFirst, pLast, pAfter, pBefore})
        return await getPage(User.indexWithCursor, User.indexWhithoutCursor)
    },
    show: async ({pId}) => {
        const getElementById = getterElementById({pId})
        return await getElementById(User.showById)
    }
}