module.exports = {
  name: 'Product',
  schema:
  `type Product {
    _id:String,
    title:String,
    description:String,
    price:Int,
    type:String,
    file_path:String,
    img_path:String,
    createdAt:String
  }`,
  querySchema:
  `
  products(pId:String, pCreatedAt:String, pFirst:Int, pLast:Int, pAfter:Int, pBefore:Int):ProductConnection
  `
}