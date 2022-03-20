const Spaceship = require('../driver/mongoDB/spaceship')
const getterPage = require('./middleware/getterPage')
const Utils = require('./utils')

module.exports = {
    query: async ({pId, pCreatedAt, pFirst, pLast, pAfter, pBefore}) => {
        try {
            const getPage = getterPage({pId, pCreatedAt, pFirst, pLast, pAfter, pBefore})
            return await getPage(Spaceship.indexWithCursor, Spaceship.indexWhithoutCursor)
        } catch (e) {
            return e
        }
    }
}