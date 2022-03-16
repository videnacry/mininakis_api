'use strict'

const { test } = require('tap')
const { build } = require('../../../helper')

test('get first 3 elements in comments', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/codeship',
    method:'post',
    body:
    JSON.stringify({query:(`{
          comments(pProduct: "5fca4b95b44c792fe029bd4d", pId: "5fe9dce2d2a28600240edb61", pCreatedAt: "1647315879423", pAfter: 5){
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
      "message": "Error: Please make sure the cursor or quantity is correct, 0 products found",
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
