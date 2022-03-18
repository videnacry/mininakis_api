'use strict'

const { test } = require('tap')
const { build } = require('../../../helper')

test('get error 0 elements found', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/codeship',
    method:'post',
    body:
    JSON.stringify({query:(`{
          products(pId: "5fe9dce2d2a28600240edb61", pCreatedAt: "1647315879423", pAfter: 5){
            edges{
              node{_id,createdAt,title,description,price,type,file_path,img_path},cursor{_id,createdAt}
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
      "message": "Error: Please make sure the cursor or quantity is correct, 0 elements found",
      "locations": [
        {
          "line": 1,
          "column": 2,
        },
      ],
      "path": [
        "products",
      ],
    },
  ],
  "data": {
    "products": null,
  },})
})
