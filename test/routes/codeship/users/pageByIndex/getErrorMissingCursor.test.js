'use strict'

const { test } = require('tap')
const { build } = require('../../../../helper')

test('get an error for not giving a valid cursor value when using "pBefore" or "pAfter"', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/codeship',
    method:'post',
    body:
    JSON.stringify({query:(`{
          users(pBefore: 30){
            edges{
              node{
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
              },cursor{_id,createdAt}
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
        "users",
      ],
    },
  ],
  "data": {
    "users": null,
  },})
})
