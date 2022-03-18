'use strict'

const { test } = require('tap')
const { build } = require('../../../helper')

test('get error elements not found', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/codeship',
    method:'post',
    body:
    JSON.stringify({query:(`{
          users(pId: "5fd367cfbd922c002458f6a9", pCreatedAt: "1647486627428", pBefore: 5){
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
      "message": "Error: Please make sure the cursor or quantity is correct, 0 elements found",
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
