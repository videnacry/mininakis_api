const product = require('./product')
const connections = [product]

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
      node:Product
      cursor:Cursor
    }
    type ${connection.name}Connection {
      edges:[ProductEdge],
      pageInfo:PageInfo!
    }
    `
    querySchema += connection.querySchema
})

schema += querySchema + '}'

module.exports = schema
