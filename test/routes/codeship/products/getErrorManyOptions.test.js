'use strict'

const { test } = require('tap')
const { build } = require('../../../helper')

test('get first 3 elements in products', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/codeship',
    method:'post',
    body:
    JSON.stringify({query:(`{
          products(pId: "5fca4b95b44c792fe029bd4d", pCreatedAt: "`+Date.parse("2020-12-04T13:50:09.062Z")+`", pBefore: 8, pAfter: 3){
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
      "message": "Please select only one option: pFirst, pLast, pAfter, pBefore, or non of them to get a product by pId", 
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
