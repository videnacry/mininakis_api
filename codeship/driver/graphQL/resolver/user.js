const User = require('../../../businessLogic/user')

module.exports = {
    Query: {
        users: async (_, params) => {
            return await User.query(params)
        }
    }
}