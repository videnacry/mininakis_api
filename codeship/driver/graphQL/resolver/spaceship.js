const Spaceship = require('../../../businessLogic/spaceship')

module.exports = {
    Query: {
        spaceships: async (_, params) => {
            return await Spaceship.query(params)
        }
    }
}