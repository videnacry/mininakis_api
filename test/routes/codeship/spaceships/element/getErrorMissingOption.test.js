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
      spaceship(pId:""){
        _id,config{fuselage,propulsionEngine,takeoff},name,goal,goal_explanation,goal_reason,owner,createdAt
      }
    }`).replace(/\n| /gi, ''),
    }),
    headers:{'Content-Type':'application/json'}
  })
  t.same(JSON.parse(res.payload), { "errors": [
    {
      "message": "Please you must give a value to one of the arguments, pId or pOwner",
      "locations": [
        {
          "line": 1,
          "column": 2,
        },
      ],
      "path": [
        "spaceship",
      ],
    },
  ],
  "data": {
    "spaceship": null,
  },})
})