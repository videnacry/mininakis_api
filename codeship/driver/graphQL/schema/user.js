module.exports = {
  name: 'User',
  schema:
  `type User {
    _id:String,
    img_path:String,
    cart:[String],
    items:[String],
    points:Int,
    username:String,
    name:String,
    lastname:String,
    email:String,
    password:String,
    description:String,
    createdAt:String
  }`,
  querySchema:
  `
  users(pId:String, pCreatedAt:String, pFirst:Int, pLast:Int, pAfter:Int, pBefore:Int):UserConnection
  user(pId:String):User
  `
}