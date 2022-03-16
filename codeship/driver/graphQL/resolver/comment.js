const Comment = require('../../../businessLogic/comment')

module.exports = {
    Query: {
        comments: async (_, params) => {
            return await Comment.query(params)
        }
    }
}