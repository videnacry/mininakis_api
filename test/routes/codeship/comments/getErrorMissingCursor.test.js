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
          comments(pBefore: 30, pProduct: "5fca4b95b44c792fe029bd4d"){
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
      "message": "Please to use pAfter or pBefore, you must also use pCursor", 
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
