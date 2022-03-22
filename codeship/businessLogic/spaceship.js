const Spaceship = require('../driver/mongoDB/spaceship')
const getterElementById = require('./middleware/getterElementById')
const getterPageByIndex = require('./middleware/getterPageByIndex')

module.exports = {
    index: async ({pId, pCreatedAt, pFirst, pLast, pAfter, pBefore}) => {
        const getPage = getterPageByIndex({pId, pCreatedAt, pFirst, pLast, pAfter, pBefore})
        return await getPage(Spaceship.indexWithCursor, Spaceship.indexWhithoutCursor)
    },
    show: async ({pId, pOwner}) => {
        if (pId) {
            if (pOwner) return new Error('Please give a value to just one of the arguments: pId, pOwner')
        const getElementById = getterElementById({pId})
        return await getElementById(Spaceship.showById)
        }
        if (!pOwner) return new Error('Please you must give a value to one of the arguments, pId or pOwner')
        try {
            return await Spaceship.showByOwner(pOwner)
        } catch (e) {
            return new Error(e.message)
        }
    }
}