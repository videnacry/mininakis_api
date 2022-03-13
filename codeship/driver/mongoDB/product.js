let mongo = null
let collection = null

module.exports = {
  injectDB: async (pMongo) => {
    if (!mongo) {
      mongo = pMongo
      collection = await pMongo.client.db(process.env.CODESHIP_DB).collection('products')
    }
  },
  indexWithCursor: async (pLead, pCursor) => {
    const aggregate = aggregatePage(pLead)(aggregateCursor(pCursor)(pLead)([]))
    return await getPage(aggregate)
  },
  indexWhithoutCursor: async (pLead) => {
    return await getPage(aggregatePage(pLead)([]))
  },
}

const aggregateCursor = (pCursor) => (pLead) => (pAggregate) => [
  {$match: {
    _id: {[pLead._id]: mongo.ObjectId(pCursor._id)},
    createdAt: {[pLead.createdAt]: new Date(Number.parseInt(pCursor.createdAt))}
  }},
  ...pAggregate
]

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

const getPage = async (pAggregate) => {
  try {
    const productsPromises = []
    productsPromises.push(collection.aggregate([{$sort:{createdAt:1, _id:1}},{$limit:1},{$project:{_id:1}},{$addFields:{isFirst:true}}]).toArray())
    productsPromises.push(collection.aggregate([{$sort:{createdAt:-1, _id:-1}},{$limit:1},{$project:{_id:1}},{$addFields:{isLast:true}}]).toArray())
    productsPromises.push(collection.aggregate(pAggregate).toArray())
    
    const results = await Promise.all(productsPromises)
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