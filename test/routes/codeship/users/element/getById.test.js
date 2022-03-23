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
      user(pId: "5ff5c6116d9cef0024fef2fa"){
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
      }
    }`).replace(/\n| /gi, ''),
  }),
    headers:{'Content-Type':'application/json'}
  })
  t.same(JSON.parse(res.payload), { data:{
    user:{                                                                                                                             
        "_id": "5ff5c6116d9cef0024fef2fa",                                                                                                         
        "img_path": "/img/user/profile.webp",                                                                                                      
        "cart": [                                                                                                                            
          "5fca3ec6b44c792fe029bd4a",                                                                                                              
        ],                                                                                                                                         
        "items": [                                                                                                                           
          "5fca3ec6b44c792fe029bd4a",                                                                                                              
        ],                                                                                                                                         
        "points": 0,                                                                                                                               
        "username": "ikki",                                                                                                                        
        "name": "henry",                                                                                                                           
        "lastname": "dominguez",                                                                                                                   
        "email": "henry@dominguez.com",                                                                                                            
        "password": "$2a$12$HBKmwu/G/FoOQkSlZx5sOemzhkZZ8YOYperrTFd6GnC9AGCB3ZXJG",                                                                
        "description": "La muerte es genial porque permite una transformación, la dificultad con que llegan las cosas hace divertido adquirirlas y vivir, cómo podrías vivir si todo lo que quisieses lo obtuvieses en ese momento?",
        "createdAt": "1647486627428",                                                                                                              
      },
  } })
})
