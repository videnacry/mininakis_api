const Product = require('./product')

let resolverFinal = {Query:{}}
const resolvers = [Product]

resolvers.forEach(resolver => {
    resolverFinal.Query = {...resolverFinal.Query, ...resolver.Query}
})

module.exports = resolverFinal