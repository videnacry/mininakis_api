'use strict'

const { test } = require('tap')
const { build } = require('../../../../helper')

test('get element by owner', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/codeship',
    method:'post',
    body:
    JSON.stringify({query:(`{
          spaceship(pOwner: "5fd2a51e2603db00242607ed"){
            _id,config{fuselage,propulsionEngine,takeoff},name,goal,goal_explanation,goal_reason,owner,createdAt
          }
        }`).replace(/\n| /gi, ''),
    }),
    headers:{'Content-Type':'application/json'}
  })
  t.same(JSON.parse(res.payload), { data:{
    spaceship:{
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
  } })
})
