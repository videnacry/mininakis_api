const getterElementById = ({pId}) => {

    return async (pShowById) => {
        try {
            
            if (!pId) throw new Error('Please you must give a value to the argument pId')
            return await pShowById(pId)
            
        } catch (e) {
            return new Error (e.message)
        }

    }
}

module.exports = getterElementById