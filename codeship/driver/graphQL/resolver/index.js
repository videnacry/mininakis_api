const Product = require('./product')
const Comment = require('./comment')
const User = require('./user')

let resolverFinal = {Query:{}}
const resolvers = [Product, Comment, User]

resolvers.forEach(resolver => {
    resolverFinal.Query = {...resolverFinal.Query, ...resolver.Query}
})

module.exports = resolverFinal