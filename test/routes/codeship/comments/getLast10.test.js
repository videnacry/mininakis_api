'use strict'

const { test } = require('tap')
const { build } = require('../../../helper')

test('get last 10 elements in comments', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/codeship',
    method:'post',
    body: JSON.stringify({query:(`{
      comments(pProduct: "5fca4b95b44c792fe029bd4d", pLast: 10){
        edges{
          node{ _id, product, comment, owner, createdAt}, cursor{_id, createdAt}
        },pageInfo{
          hasNextPage,hasPreviousPage,startCursor{_id,createdAt},endCursor{_id,createdAt}
        }
      }
    }`).replace(/\n| /gi, ''),
}),
    headers:{'Content-Type':'application/json'}
  })
  t.same(JSON.parse(res.payload), { data:{
    comments:{
      edges: [{
        node: {
          _id: "5fda3c7417ec85002412cd58",     
          product: "5fca4b95b44c792fe029bd4d", 
          comment: "help¡",
          owner: "5fd2a51e2603db00242607ed",   
          createdAt: "1647315879341",
        },
        cursor: {
          _id: "5fda3c7417ec85002412cd58",     
          createdAt: "1647315879341",
        },
      },{
        node: {
          _id: "5fe9dce2d2a28600240edb61",     
          product: "5fca4b95b44c792fe029bd4d", 
          comment: "test 45678",
          owner: "5fd2a51e2603db00242607ed",   
          createdAt: "1647315879423",
        },
        cursor: {
          _id: "5fe9dce2d2a28600240edb61",     
          createdAt: "1647315879423",
        },
      },], pageInfo: {
        hasNextPage: true,
        hasPreviousPage: false,
        startCursor: {
          _id: "5fda3c7417ec85002412cd58",       
          createdAt: "1647315879341"
        },
        endCursor: {
          _id: "5fe9dce2d2a28600240edb61",       
          createdAt: "1647315879423"
        }
      }
    }
  } })
})
