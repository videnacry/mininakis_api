'use strict'

const { test } = require('tap')
const { build } = require('../../../helper')

test('get error for not giving a product id', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/codeship',
    method:'post',
    body:
    JSON.stringify({query:(`{
          comments(pBefore:3){
            edges{
              node{ _id, product, comment, owner, createdAt}, cursor{_id, createdAt}
            },pageInfo{
              hasNextPage,hasPreviousPage,startCursor{_id,createdAt},endCursor{_id,createdAt}
            }
          }
        }`).replace(/\n| /gi, ''),
    }),
    headers:{'Content-Type':'application/json'}
  })
  t.same(JSON.parse(res.payload), { "errors": [
    {
      "message": "Please give an ObjectID string to pProduct, value required",
      "locations": [
        {
          "line": 1,
          "column": 2,
        },
      ],
      "path": [
        "comments",
      ],
    },
  ],
  "data": {
    "comments": null,
  },})
})
