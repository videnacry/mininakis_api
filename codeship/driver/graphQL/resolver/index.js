const Product = require('./product')
const Comment = require('./comment')

let resolverFinal = {Query:{}}
const resolvers = [Product, Comment]

resolvers.forEach(resolver => {
    resolverFinal.Query = {...resolverFinal.Query, ...resolver.Query}
})

module.exports = resolverFinal