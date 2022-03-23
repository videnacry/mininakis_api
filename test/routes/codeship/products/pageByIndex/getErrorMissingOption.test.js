'use strict'

const { test } = require('tap')
const { build } = require('../../../../helper')

test('get error for not giving a value to any one of the options: pFirst, pLast, pAfter, pBefore', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/codeship',
    method:'post',
    body:
    JSON.stringify({query:(`{
          products(pCreatedAt:"`+Date.parse("2020-12-04T13:50:09.062Z")+`", pFirst:-1){
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
      "message": "Please give a value to only one of the arguments: pFirst, pLast, pAfter, pBefore,and make sure it is an integer between 0 and 41",
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