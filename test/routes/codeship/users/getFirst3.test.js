'use strict'

const { test } = require('tap')
const { build } = require('../../../helper')

test('get first 3 elements in users', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/codeship',
    method:'post',
    body:
    (`{"query":"{
          users(pFirst:3){
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
        }"
      }`).replace(/\n| /gi, ''),
    headers:{'Content-Type':'application/json'}
  })
  t.same(JSON.parse(res.payload), { data:{
    users:{
      edges: [
          {
            "node": {
              "_id": "5fd367cfbd922c002458f6a9",
              "img_path": "/img/user/Carlota.jpg",
              "cart": [
                "5fca3ec6b44c792fe029bd4a",
              ],
              "items": [
                "5fca3ec6b44c792fe029bd4a",
              ],
              "points": 0,
              "username": "Carlota",
              "name": "Carlota",
              "lastname": "gallart",
              "email": "charli@codeship.com",
              "password": "$2a$12$JKYRqjWCg2/mNLaOmfsQgu9wC6HKIH5X8mvpbrT3xj0yb7NeAJMZu",
              "description": "hello im updated",
              "createdAt": "1647486627428",
            },                                                                                                                                     
            "cursor": {                                                                                                                     
              "_id": "5fd367cfbd922c002458f6a9",                                                                                                   
              "createdAt": "1647486627428",                                                                                                        
            },                                                                                                                                     
          },                                                                                                                                       
          {                                                                                                                                 
            "node": {                                                                                                                       
              "_id": "5ff5c210739e43002419290a",                                                                                                   
              "img_path": "/img/user/babyblue.jpg",                                                                                                
              "cart": [                                                                                                                      
                "5fca3ec6b44c792fe029bd4a",                                                                                                        
              ],                                                                                                                                   
              "items": [                                                                                                                     
                "5fca3ec6b44c792fe029bd4a",                                                                                                        
              ],                                                                                                                                   
              "points": 0,                                                                                                                         
              "username": "babyblue",                                                                                                              
              "name": "abu",                                                                                                                       
              "lastname": "sayeed",                                                                                                                
              "email": "abu@sayeed.com",                                                                                                           
              "password": "$2a$12$ckefGqTCX/anQJQfuYq.a.2SS0Q1v5iwGspcHrItVpVKXSPsLYC9q",                                                          
              "description": "Don't confuse my personality with my attitude. My personality is who I am. My attitude depends on tho you are.",     
              "createdAt": "1647486627428",                                                                                                        
            },                                                                                                                                     
            "cursor": {                                                                                                                     
              "_id": "5ff5c210739e43002419290a",                                                                                                   
              "createdAt": "1647486627428",                                                                                                        
            },                                                                                                                                     
          },                                                                                                                                       
          {                                                                                                                                 
            "node": {                                                                                                                       
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
            "cursor": {                                                                                                                     
              "_id": "5ff5c6116d9cef0024fef2fa",                                                                                                   
              "createdAt": "1647486627428",                                                                                                        
            },                                                                                                                                     
          }], pageInfo: {
        hasNextPage: true,
        hasPreviousPage: false,
        startCursor: {
          _id: "5fd367cfbd922c002458f6a9",                                                                                                     
          createdAt: "1647486627428", 
        },
        endCursor: {
          _id: "5ff5c6116d9cef0024fef2fa",                                                                                                     
          createdAt: "1647486627428", 
        }
      }
    }
  } })
})
