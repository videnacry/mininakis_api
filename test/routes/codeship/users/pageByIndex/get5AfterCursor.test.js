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
          users(pId: "5ff5c6116d9cef0024fef2fa", pCreatedAt: "1647486627428", pAfter: 5){
            edges{
              node{
                _id,
                img_path,
                cart,
                items,
                points,
                username,
                name,
                lastname,
                email,
                password,
                description,
                createdAt
              },cursor{_id,createdAt}
            },pageInfo{
              hasNextPage,hasPreviousPage,startCursor{_id,createdAt},endCursor{_id,createdAt}
            }
          }
        }`).replace(/\n| /gi, ''),
    }),
    headers:{'Content-Type':'application/json'}
  })
  t.same(JSON.parse(res.payload), { data: {
    users: {
      edges: [{
          "node": {
            "_id": "5ff6e43c19833b0024a4f607",
            "img_path": "/img/user/pau.jpg",
            "cart": [
              "5fca45ffb44c792fe029bd4c",
              "5fca3fb7b44c792fe029bd4b",
              "5fca3ec6b44c792fe029bd4a",
            ],
            "items": [
              "5fca3ec6b44c792fe029bd4a",
            ],
            "points": 70,
            "username": "pau",
            "name": "pau",
            "lastname": "pau",
            "email": "pau@gmail.com",
            "password": "$2a$12$jAmDaGXewqhSc/Uo.mP3WOU0VXm7oxR8Wa3gqeK.1qhgL2O.neZkm", 
            "description": "pau",
            "createdAt": "1647486627428",
          },
          "cursor": {
            "_id": "5ff6e43c19833b0024a4f607",
            "createdAt": "1647486627428",
          },
        },
        {
          "node": {
            "_id": "60055bf2662ba10024867347",
            "img_path": "/img/user/marcbaque.jpg",
            "cart": [
              "5fca3ec6b44c792fe029bd4a",
            ],
            "items": [
              "5fca3ec6b44c792fe029bd4a",
            ],
            "points": 50,
            "username": "marcbaque",
            "name": "marc",
            "lastname": "baque",
            "email": "marcbaque@mail.com",
            "password": "$2a$12$zC9SAPgFey.8helYCjAcxe.cSMk.onIDJ.n1FS5Bh21aln41EKB6C", 
            "description": "hello i'm marc!",
            "createdAt": "1647486627428",
          },
          "cursor": {
            "_id": "60055bf2662ba10024867347",
            "createdAt": "1647486627428",
          },
        }], pageInfo: {
        hasNextPage: true,
        hasPreviousPage: true,
        startCursor: {
          _id: "5ff6e43c19833b0024a4f607",
          createdAt: "1647486627428",
        },
        endCursor: {
          _id: "60055bf2662ba10024867347",
          createdAt: "1647486627428"
        }
      }
    }
  } })
})
