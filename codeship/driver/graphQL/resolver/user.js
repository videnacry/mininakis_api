const User = require('../../../businessLogic/user')

module.exports = {
    Query: {
        users: async (_, params) => await User.index(params)
        ,
        user: async (_, params) => await User.show(params)
    }
}