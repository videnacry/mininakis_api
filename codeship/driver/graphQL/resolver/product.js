const Product = require('../../../businessLogic/product')

module.exports = {
    Query: {
        products: async (_, params) => {
            return await Product.query(params)
        }
    }
}