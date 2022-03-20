const Product = require('./product')
const Comment = require('./comment')
const User = require('./user')
const Spaceship = require('./spaceship')

let resolverFinal = {Query:{}}
const resolvers = [Product, Comment, User, Spaceship]

resolvers.forEach(resolver => {
    resolverFinal.Query = {...resolverFinal.Query, ...resolver.Query}
})

module.exports = resolverFinal