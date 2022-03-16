const Comment = require('../driver/mongoDB/comment')
const Utils = require('./utils')

module.exports = {
    query: async ({pId, pCreatedAt, pProduct, pFirst, pLast, pAfter, pBefore}) => {
        try {
            if (!pProduct) throw new Error('Please give an ObjectID string to pProduct, value required')

            Utils.onlyOneOptionBetween({pFirst, pLast, pAfter, pBefore}, 0, 41)

            let lead = null
            if (pAfter || pFirst) lead = {_id: "$gt", createdAt: "$gte", sort: 1, limit: pAfter|pFirst}
            if (pBefore || pLast) lead = {_id: "$lt", createdAt: "$lte", sort: -1, limit: pBefore|pLast}
            
            let commentPage = null
            if (pAfter || pBefore) {
                if (!pId || !pCreatedAt) throw new Error('Please to use pAfter or pBefore, you must also use pCursor')

                const cursor = {_id: pId, createdAt: pCreatedAt}
                commentPage = await Comment.indexWithCursor(lead, cursor, {product: pProduct})
            } else {
                if (pId || pCreatedAt) throw new Error('Please do not use pId or pCreatedAt along with pFirst or pLast')

                commentPage = await Comment.indexWhithoutCursor(lead, {product: pProduct})
            }
            
            return commentPage
        } catch (e) {
            return e
        }
    }
}