const Product = require('./product')
const Comment = require('./comment')
const connections = [Product, Comment]

let schema = `
type Cursor {
  _id:String,
  createdAt:String
}
type PageInfo {
  hasNextPage:Boolean,
  hasPreviousPage:Boolean,
  startCursor:Cursor,
  endCursor:Cursor
}
`
let querySchema = `
type Query {
`

connections.forEach(connection => {
    schema += `
    ${connection.schema}
    type ${connection.name}Edge {
      node:${connection.name}
      cursor:Cursor
    }
    type ${connection.name}Connection {
      edges:[${connection.name}Edge],
      pageInfo:PageInfo!
    }
    `
    querySchema += connection.querySchema
})

schema += querySchema + '}'

module.exports = schema
