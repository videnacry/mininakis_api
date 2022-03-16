const Product = require('../driver/mongoDB/product')
const Utils = require('./utils')

module.exports = {
    query: async ({pId, pCreatedAt, pFirst, pLast, pAfter, pBefore}) => {
        try {
            Utils.onlyOneOptionBetween({pFirst, pLast, pAfter, pBefore}, 0, 41)

            let lead = null
            if (pAfter || pFirst) lead = {_id: "$gt", createdAt: "$gte", sort: 1, limit: pAfter|pFirst}
            if (pBefore || pLast) lead = {_id: "$lt", createdAt: "$lte", sort: -1, limit: pBefore|pLast}
            
            let productPage = null
            if (pAfter || pBefore) {
                if (!pId || !pCreatedAt) throw new Error('Please to use pAfter or pBefore, you must also use pCursor')

                const cursor = {_id: pId, createdAt: pCreatedAt}
                productPage = await Product.indexWithCursor(lead, cursor)
            } else {
                if (pId || pCreatedAt) throw new Error('Please do not use pId or pCreatedAt along with pFirst or pLast')
                
                productPage = await Product.indexWhithoutCursor(lead)
            }
            
            return productPage
        } catch (e) {
            return e
        }
    }
}