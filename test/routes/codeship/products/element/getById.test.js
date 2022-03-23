'use strict'

const { test } = require('tap')
const { build } = require('../../../../helper')

test('get element by id', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/codeship',
    method:'post',
    body:
    JSON.stringify({query:(`{
        product(pId: "5fca4b95b44c792fe029bd4d"){
          _id,createdAt,title,description,price,type,file_path,img_path
        }
      }`).replace(/\n| /gi, ''),
    }),
    headers:{'Content-Type':'application/json'}
  })
  t.same(JSON.parse(res.payload), { data:{
    product:{                                                                                                                          
      "_id": "5fca4b95b44c792fe029bd4d",                                                                                                         
      "createdAt": "1607089809062",                                                                                                              
      "title": "SpiderTO",                                                                                                                       
      "description": "Spider take-off propulsion, well known for the hot swap of percentage of components to get a completely different source of push which make it perfect to go outerspace or under water! the only problem is the need of lot of components.",
      "price": 16,                                                                                                                               
      "type": "takeoff",                                                                                                                         
      "file_path": "SpiderTO.js",                                                                                                                
      "img_path": "/img/product/1607093141236SpiderTO.png",                                                                                      
    },
  } })
})
