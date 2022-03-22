const Spaceship = require('../../../businessLogic/spaceship')

module.exports = {
    Query: {
        spaceships: async (_, params) =>  await Spaceship.index(params)
        ,
        spaceship: async (_, params) => await Spaceship.show(params)
    }
}