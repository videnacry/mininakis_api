const Product = require('../../../businessLogic/product')

module.exports = {
    Query: {
        products: async (_, params) => await Product.index(params)
        ,
        product: async (_, params) => await Product.show(params)
    }
}