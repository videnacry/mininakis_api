const Product = require('../driver/mongoDB/product')
const Utils = require('./utils')

module.exports = {
    query: async ({pId, pCreatedAt, pFirst, pLast, pAfter, pBefore}) => {
        try {
            const productsAskedTimes = {count:0}
            Utils.increaseByBool(productsAskedTimes)(pFirst)(pLast)(pAfter)(pBefore);
            if (productsAskedTimes.count > 1 || productsAskedTimes.count === 0) throw new Error('Please select only one option: pFirst, pLast, pAfter, pBefore')

            let lead = null
            if (pAfter || pFirst) lead = {_id: "$gt", createdAt: "$gte", sort: 1, limit: pAfter|pFirst}
            if (pBefore || pLast) lead = {_id: "$lt", createdAt: "$lte", sort: -1, limit: pBefore|pLast}
            
            let productPage = null
            if (pAfter || pBefore) {
                if (pAfter > 40 || pBefore > 40) throw new Error('pAfter, pBefore, pLast and pFirst values must be less then 40')
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