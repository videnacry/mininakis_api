'use strict'

const { test } = require('tap')
const { build } = require('../../../../helper')

test('get first 3 elements in the collection, which is sorted by createdAt and _id', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/codeship',
    method:'post',
    body:
    (`{"query":"{
          products(pFirst:3){
            edges{
              node{_id,createdAt,title,description,price,type,file_path,img_path},cursor{_id,createdAt}
            },pageInfo{
              hasNextPage,hasPreviousPage,startCursor{_id,createdAt},endCursor{_id,createdAt}
            }
          }
        }"
      }`).replace(/\n| /gi, ''),
    headers:{'Content-Type':'application/json'}
  })
  t.same(JSON.parse(res.payload), { data:{
    products:{
      edges: [
        {
          node: {
            _id: ("5fca3ec6b44c792fe029bd4a"),
            createdAt: Date.parse("2020-12-04T13:50:09.062Z"),
            title: 'StandardF',
            description: "Standard fuselage, usually loved for groups desiring to be near the outer space. It was popular for it's incredible achievment of almost transparent security, however the capacity of this is ship is poor.",
            price: 12,
            type: 'fuselage',
            file_path: 'StandardF.js',
            img_path: '/img/product/1607089862800Standard_F.png',
            
          },
          cursor: {
            _id: ("5fca3ec6b44c792fe029bd4a"),
            createdAt: Date.parse("2020-12-04T13:50:09.062Z")
          }
        },
        {
          node: {
            _id: ("5fca3fb7b44c792fe029bd4b"),
            createdAt: Date.parse("2020-12-04T13:50:09.062Z"),
            title: 'StandardTO',
            description: "Standard take-off propulsion, it is supposed to be a piece of art, using sound waves can easily abandon the ground making the beautiful sounds you could hear! It's is a mistery why such waves are so attractive to us.",
            price: 12,
            type: 'takeoff',
            file_path: 'StandardTO.js',
            img_path: '/img/product/1607090103728Standard_TO.png',
            
          },
          cursor: {
            _id: ("5fca3fb7b44c792fe029bd4b"),
            createdAt: Date.parse("2020-12-04T13:50:09.062Z")
          }
        },
        {
          node: {
            _id: ("5fca45ffb44c792fe029bd4c"),
            createdAt: Date.parse("2020-12-04T13:50:09.062Z"),
            title: 'StandardPE',
            description: 'Standard propulsion engine is well known for the creative way it manage to consume polarities, it has some origin in the cicles described in the art of human nose respiration, where each nostril gets stronger than the other for a time.',
            price: 12,
            type: 'propulsionEngine',
            file_path: 'StandardPE.js',
            img_path: '/img/product/1607091711706Standard_PE.png',
            
          },
          cursor: {
            _id: ("5fca45ffb44c792fe029bd4c"),
            createdAt: Date.parse("2020-12-04T13:50:09.062Z")
          }
        }
      ], pageInfo: {
        hasNextPage: true,
        hasPreviousPage: false,
        startCursor: {
          _id: ("5fca3ec6b44c792fe029bd4a"),
          createdAt: Date.parse("2020-12-04T13:50:09.062Z")
        },
        endCursor: {
          _id: ("5fca45ffb44c792fe029bd4c"),
          createdAt: Date.parse("2020-12-04T13:50:09.062Z")
        }
      }
    }
  } })
})
