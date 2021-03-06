'use strict'

const { test } = require('tap')
const { build } = require('../../../../helper')

test('get the last 10 elements in the collection, which is sorted by createdAt and _id', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/codeship',
    method:'post',
    body:
    (`{"query":"{
          spaceships(pLast:10){
            edges{
              node{_id,config{fuselage,propulsionEngine,takeoff},name,goal,goal_explanation,goal_reason,owner,createdAt},cursor{_id,createdAt}
            },pageInfo{
              hasNextPage,hasPreviousPage,startCursor{_id,createdAt},endCursor{_id,createdAt}
            }
          }
        }"
      }`).replace(/\n| /gi, ''),
    headers:{'Content-Type':'application/json'}
  })
  t.same(JSON.parse(res.payload), { data:{
    spaceships:{
      edges: [
        {
          "node": {
            "_id": "5fe0964dc700ac0024ff9554",
            "config": {
              "fuselage": "StandardF",
              "propulsionEngine": "StandardPE",
              "takeoff": "StandardTO",
            },
            "name": "Thoth",
            "goal": "be light in my programming world",
            "goal_explanation": "make me go throught the programming knowledge", 
            "goal_reason": "I want to write clean code!!",
            "owner": "5fd2a51e2603db00242607ed",
            "createdAt": "1647761629781",
          },
          "cursor": {
            "_id": "5fe0964dc700ac0024ff9554",
            "createdAt": "1647761629781",
          },
        },
      ], pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: {
          "_id": "5fe0964dc700ac0024ff9554",                                                                                                     
          "createdAt": "1647761629781", 
        },
        endCursor: {
          "_id": "5fe0964dc700ac0024ff9554",
          "createdAt": "1647761629781",
        }
      }
    }
  } })
})
