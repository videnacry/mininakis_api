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
      user(pId: ""){
        _id,
        img_path,
        cart,
        items,
        points,
        username,
        name,
        lastname,
        email,
        password,
        description,
        createdAt
      }
    }`).replace(/\n| /gi, '')}),
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
        "user",
      ],
    },
  ],
  "data": {
    "user": null,
  },})
})