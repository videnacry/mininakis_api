module.exports = {
  name: 'Comment',
  schema:
  `type Comment {
    _id:String,
    product:String,
    comment:String,
    owner:String
    createdAt:String
  }`,
  querySchema:
  `
  comments(pId:String, pCreatedAt:String, pProduct:String, pFirst:Int, pLast:Int, pAfter:Int, pBefore:Int):CommentConnection
  `
}