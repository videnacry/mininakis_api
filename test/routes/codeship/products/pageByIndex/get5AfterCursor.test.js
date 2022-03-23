'use strict'

const { test } = require('tap')
const { build } = require('../../../../helper')

test('get first 5 elements after the element represented by the cursor, in the collection, which is sorted by createdAt and _id', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/codeship',
    method:'post',
    body:
    JSON.stringify({query:(`{
          products(pId: "5fca4b95b44c792fe029bd4d", pCreatedAt: "`+Date.parse("2020-12-04T13:50:09.062Z")+`", pAfter: 5){
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
        },
        {
          node: {
            _id: ("5fca4f7607dcab1c4c9a572f"),
            createdAt: Date.parse("2020-12-04T14:57:27.243Z"),
            title: 'MiniF',
            description: 'Mini fuselage is a real bird in the outerspace, how can this be? biospace investigations motivate a lot of projects, this novelty object has strong instinct and hability to change its components to asure passenger safe.',
            price: 14,
            type: 'fuselage',
            file_path: 'MiniF.js',
            img_path: '/img/product/1607094134145Mini_F.png',
            
          },
          cursor: {
            _id: ("5fca4f7607dcab1c4c9a572f"),
            createdAt: Date.parse("2020-12-04T14:57:27.243Z")
          }
        },
        {
          node: {
            _id: ("5fca553707dcab1c4c9a5730"),
            createdAt: Date.parse("2020-12-04T14:57:27.243Z"),
            title: 'MiniPE',
            description: "Mini propulsion engine is the older brother of SpiderPE, it use the biotechnology to change the source of push however the cost to it's life span is such, that it is not recommended, so is more used like a emergency mechanism.",
            price: 14,
            type: 'propulsionEngine',
            file_path: 'MiniPE.js',
            img_path: '/img/product/1607095607660Mini_PE.png',
            
          },
          cursor: {
            _id: ("5fca553707dcab1c4c9a5730"),
            createdAt: Date.parse("2020-12-04T14:57:27.243Z")
          }
        },
        {
          node: {
            _id: ("5fca56ca07dcab1c4c9a5731"),
            createdAt: Date.parse("2020-12-04T14:57:27.243Z"),
            title: 'BirdPE',
            description: "Bird propulsion engine is so appreciated today for it's improves in contrast with the MiniPE, the facility it has to change it's functionalities is perfect for long travels as the life span doesn't change much for this changes.",
            price: 20,
            type: 'propulsionEngine',
            file_path: 'BirdPE.js',
            img_path: '/img/product/1607096010695Bird_PE.png',
            
          },
          cursor: {
            _id: ("5fca56ca07dcab1c4c9a5731"),
            createdAt: Date.parse("2020-12-04T14:57:27.243Z")
          }
        },
        {
          node: {
            _id: ("5fca5c9607dcab1c4c9a5732"),
            createdAt: Date.parse("2020-12-04T14:57:27.243Z"),
            title: 'BirdF',
            description: "Bird fuselage is far enough from it's predecessor, unlike it, the capabilities like speed and movement has no comparison, if it only could take more people!, but it wasn't created for that, then?, some anonym enterprise hasthousands of it...",
            price: 20,
            type: 'fuselage',
            file_path: 'BirdF.js',
            img_path: '/img/product/1607097494836Bird_F.png',
            
          },
          cursor: {
            _id: ("5fca5c9607dcab1c4c9a5732"),
            createdAt: Date.parse("2020-12-04T14:57:27.243Z")
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
          _id: ("5fca5c9607dcab1c4c9a5732"),
          createdAt: Date.parse("2020-12-04T14:57:27.243Z")
        }
      }
    }
  } })
})
