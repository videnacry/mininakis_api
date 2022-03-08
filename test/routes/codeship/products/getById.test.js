'use strict'

const { test } = require('tap')
const { build } = require('../../../helper')

test('get first 3 elements in products', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/codeship',
    method:'post',
    body:
    JSON.stringify({query:(`{
          products(pId: "5fca4c71b44c792fe029bd4e"){
            edges{
              node{_id,createdAt,title,description,price,type,file_path,img_path},cursor{_id,createdAt}
            },pageInfo{
              hasNextPage,hasPreviousPage,startCursor{_id,createdAt},endCursor{_id,createdAt}
            }
          }
        }`).replace(/\n| /gi, ''),
    }),
    headers:{'Content-Type':'application/json'}
  })
  t.same(JSON.parse(res.payload), { data: {
    products: {
      edges: [
        {
            node: {
              _id: ("5fca4c71b44c792fe029bd4e"),
              createdAt: Date.parse("2020-12-04T13:50:09.062Z"),
              title: 'SpiderF',
              description: 'Spider fuselage had the strong idea of no ground, the interior physics are something to take in count, is configured to put your furniture in some places and be sure it is not going to move from there, the movement here is also natural.',
              price: 16,
              type: 'fuselage',
              file_path: 'SpiderF.js',
              img_path: '/img/product/1607093361269SpiderF.png',
              
            },
            cursor: {
              _id: ("5fca4c71b44c792fe029bd4e"),
              createdAt: Date.parse("2020-12-04T13:50:09.062Z")
            }
          }
      ], pageInfo: {
        hasNextPage: true,
        hasPreviousPage: true,
        startCursor: {
          _id: ("5fca4c71b44c792fe029bd4e"),
          createdAt: Date.parse("2020-12-04T13:50:09.062Z")
        },
        endCursor: {
            _id: ("5fca4c71b44c792fe029bd4e"),
            createdAt: Date.parse("2020-12-04T13:50:09.062Z")
        }
      }
    }
  } })
})
