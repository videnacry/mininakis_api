'use strict'

const { test } = require('tap')
const { build } = require('../../../../helper')

test('get first 3 elements in spaceships', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/codeship',
    method:'post',
    body:
      JSON.stringify({query:(`{
        spaceship(pId: "5fe0964dc700ac0024ff9554", pOwner:"5fd2a51e2603db00242607ed"){
          _id,config{fuselage,propulsionEngine,takeoff},name,goal,goal_explanation,goal_reason,owner,createdAt
        }
      }`).replace(/\n| /gi, ''),
      }),
    headers:{'Content-Type':'application/json'}
  })
  t.same(JSON.parse(res.payload), { "errors": [
    {
      "message": "Please give a value to just one of the arguments: pId, pOwner",
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
