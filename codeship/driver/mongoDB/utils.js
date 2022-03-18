const ObjectID = require('bson').ObjectID
const aggregateCursor = (pCursor) => (pLead) => (pAggregate) => [
    {$match: {
      _id: {[pLead._id]: ObjectID(pCursor._id)},
      createdAt: {[pLead.createdAt]: new Date(Number.parseInt(pCursor.createdAt))}
    }},
    ...pAggregate
]

const aggregateMatchObjectID = (pMatch) => (pAggregate) => {
  const pMatchEntries = Object.entries(pMatch)
  
  return [
    {$match: {[pMatchEntries[0][0]]:ObjectID(pMatchEntries[0][1])}},
    ...pAggregate
  ]
}

const aggregatePage = (pLead) => (pAggregate) => [
  ...pAggregate,
  {$sort: {createdAt: pLead.sort, _id: pLead.sort}},
  {$limit: pLead.limit},
  {$bucketAuto: {
    groupBy: '$_id',
    buckets: 1,
    output: {totalCount: {$sum: 1}, edges: {$push: {node: "$$ROOT", cursor: {_id: "$_id", createdAt: "$createdAt"}}}}
  }}
]

const getPage = async (pAggregate, pCollection) => {
  try {
    const productsPromises = []
    productsPromises.push(pCollection.aggregate([{$sort:{createdAt:1, _id:1}},{$limit:1},{$project:{_id:1}},{$addFields:{isFirst:true}}]).toArray())
    productsPromises.push(pCollection.aggregate([{$sort:{createdAt:-1, _id:-1}},{$limit:1},{$project:{_id:1}},{$addFields:{isLast:true}}]).toArray())
    productsPromises.push(pCollection.aggregate(pAggregate).toArray())
    
    const results = await Promise.all(productsPromises)
    if (results[0].length < 1 || results[1].length < 1 || results[2].length < 1) throw new Error('Please make sure the cursor or quantity is correct, 0 elements found')
    
    const products = {}
    results.map(result => {
      if (result[0].isFirst) products.firstOne = result[0]
      else if (result[0].isLast) products.lastOne = result[0]
      else {
        const startCursor = result[0].edges[0].cursor
        const endCursor = result[0].edges[result[0].totalCount - 1].cursor
        result[0].pageInfo = {
          hasNextPage: !endCursor._id.equals(products.lastOne._id),
          hasPreviousPage: !startCursor._id.equals(products.firstOne._id),
          startCursor,
          endCursor
        }
        products.page = result[0]
      }
    })
    return products.page
  } catch (e) {
    throw new Error(e)
  }
}

module.exports = {
    aggregateCursor, aggregateMatchObjectID, aggregatePage, getPage
}