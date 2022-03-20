'use strict'

const { test } = require('tap')
const { build } = require('../../../helper')

test('get error for giving a value greeter than the limit to one of the options: pFirst, pLast, pAfter, pBefore', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/codeship',
    method:'post',
    body:
    JSON.stringify({query:(`{
          spaceships(pId: "5fca4b95b44c792fe029bd4d", pCreatedAt: "`+Date.parse("2020-12-04T13:50:09.062Z")+`", pBefore: 41){
            edges{
              node{_id,config{fuselage,propulsionEngine,takeoff},name,goal,goal_explanation,goal_reason,owner,createdAt},cursor{_id,createdAt}
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
        "spaceships",
      ],
    },
  ],
  "data": {
    "spaceships": null,
  },})
})
