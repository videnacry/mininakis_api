'use strict'

const { test } = require('tap')
const { build } = require('../../../../helper')

test('get error for not giving a value to pId', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/codeship',
    method:'post',
    body:
    JSON.stringify({query:(`{
        product(pId: ""){
          _id,createdAt,title,description,price,type,file_path,img_path
        }
      }`).replace(/\n| /gi, ''),
    }),
    headers:{'Content-Type':'application/json'}
  })
  t.same(JSON.parse(res.payload), { "errors": [
    {
      "message": "Please you must give a value to the argument pId",
      "locations": [
        {
          "line": 1,
          "column": 2,
        },
      ],
      "path": [
        "product",
      ],
    },
  ],
  "data": {
    "product": null,
  },})
})