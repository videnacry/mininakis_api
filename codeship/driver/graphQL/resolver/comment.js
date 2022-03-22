const Comment = require('../../../businessLogic/comment')

module.exports = {
    Query: {
        comments: async (_, params) => await Comment.index(params)
    }
}