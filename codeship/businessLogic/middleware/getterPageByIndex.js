const Utils = require('../utils')

const getterPage = ({pId, pCreatedAt, pFirst, pLast, pAfter, pBefore}) => {

    return async (pIndexWithCursor, pIndexWithoutCursor) => {
        try {

            Utils.onlyOneOptionBetween({pFirst, pLast, pAfter, pBefore}, 0, 41)
            
            let lead = null
            if (pAfter || pFirst) lead = {_id: "$gt", createdAt: "$gte", sort: 1, limit: pAfter|pFirst}
            if (pBefore || pLast) lead = {_id: "$lt", createdAt: "$lte", sort: -1, limit: pBefore|pLast}
            
            let entityPage = null
            
            if (pAfter || pBefore) {
                if (!pId || !pCreatedAt) throw new Error('Please to use pAfter or pBefore, you must also use pCursor')
            
                const cursor = {_id: pId, createdAt: pCreatedAt}
                entityPage = await pIndexWithCursor(lead, cursor)
            } else {
                if (pId || pCreatedAt) throw new Error('Please do not use pId or pCreatedAt along with pFirst or pLast')
                
                entityPage = await pIndexWithoutCursor(lead)
            }
            
            return entityPage
        } catch (e) {
            return new Error (e.message)
        }

    }
}

module.exports = getterPage