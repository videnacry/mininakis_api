'use strict'

const { test } = require('tap')
const { build } = require('../../../helper')

test('get first 3 elements in spaceships', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/codeship',
    method:'post',
    body:
    JSON.stringify({query:(`{
          spaceships(pId: "5fca4b95b44c792fe029bd4d", pFirst: 33){
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
      "message": "Please do not use pId or pCreatedAt along with pFirst or pLast", 
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