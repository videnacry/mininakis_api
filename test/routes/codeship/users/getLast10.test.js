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
          users(pLast:10){
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
            "_id": "5fcfcd9961c30f238871f842",                                                                                                   
            "img_path": "/img/user/videnacry.jpg",                                                                                               
            "cart": [                                                                                                                      
              "5fca3ec6b44c792fe029bd4a",                                                                                                        
            ],                                                                                                                                   
            "items": [                                                                                                                     
              "5fca3ec6b44c792fe029bd4a",                                                                                                        
            ],                                                                                                                                   
            "points": 0,                                                                                                                         
            "username": "videnacry",                                                                                                             
            "name": "BERÓN GAMBOA",                                                                                                              
            "lastname": "GAMBOA",                                                                                                                
            "email": "beron@carlota.com",                                                                                                        
            "password": "$2a$12$/OQJvfkBrFEpR4FLYW.yiOcWTvZxKtXCyqUcmwIq.7/4gPdFw9d6K",                                                          
            "description": "The computer can be it's own creator.",                                                                              
            "createdAt": "1647486627429",                                                                                                        
          },                                                                                                                                     
          "cursor": {                                                                                                                     
            "_id": "5fcfcd9961c30f238871f842",                                                                                                   
            "createdAt": "1647486627429",                                                                                                        
          },                                                                                                                                     
        },                                                                                                                                       
        {                                                                                                                                 
          "node": {                                                                                                                       
            "_id": "5fd2a51e2603db00242607ed",                                                                                                   
            "img_path": "/img/user/imansharkie.jpg",                                                                                             
            "cart": [                                                                                                                      
              "5fca680e07dcab1c4c9a5736",                                                                                                        
              "5fca3ec6b44c792fe029bd4a",                                                                                                        
            ],                                                                                                                                   
            "items": [                                                                                                                     
              "5fca45ffb44c792fe029bd4c",                                                                                                        
              "5fca45ffb44c792fe029bd4c",                                                                                                        
              "5fca4f7607dcab1c4c9a572f",                                                                                                        
              "5fca5dd607dcab1c4c9a5733",                                                                                                        
              "5fca553707dcab1c4c9a5730",                                                                                                        
              "5fca5f3407dcab1c4c9a5734",                                                                                                        
              "5fca4c71b44c792fe029bd4e",                                                                                                        
              "5fca3fb7b44c792fe029bd4b",                                                                                                        
              "5fca3ec6b44c792fe029bd4a",                                                                                                        
              "5fca4b95b44c792fe029bd4d",                                                                                                        
              "5fca65fc07dcab1c4c9a5735",                                                                                                        
            ],                                                                                                                                   
            "points": 44,                                                                                                                        
            "username": "imansharkie",                                                                                                           
            "name": "Iman",                                                                                                                      
            "lastname": "Sharkie",                                                                                                               
            "email": "iman@codeship.com",                                                                                                        
            "password": "$2a$12$anGe9e/ok44boJKEUHcHiu9zVZFwDUQZ5IVAy0/FY0xSlI9CpAI4W",                                                          
            "description": "hello my name is iman and i like to code",                                                                           
            "createdAt": "1647486627429",                                                                                                        
          },                                                                                                                                     
          "cursor": {                                                                                                                     
            "_id": "5fd2a51e2603db00242607ed",                                                                                                   
            "createdAt": "1647486627429",                                                                                                        
          },                                                                                                                                     
        },                                                                                                                                       
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
            "_id": "5fd8d482c8703e0024444a0b",                                                                                                   
            "img_path": "/img/user/belen123.jpg",                                                                                                
            "cart": [                                                                                                                      
              "5fca3ec6b44c792fe029bd4a",                                                                                                        
            ],                                                                                                                                   
            "items": [                                                                                                                     
              "5fca3ec6b44c792fe029bd4a",                                                                                                        
              "5fca3fb7b44c792fe029bd4b",                                                                                                        
              "5fca45ffb44c792fe029bd4c",                                                                                                        
              "5fca680e07dcab1c4c9a5736",                                                                                                        
              "5fca5f3407dcab1c4c9a5734",                                                                                                        
              "5fca4f7607dcab1c4c9a572f",                                                                                                        
              "5fca4c71b44c792fe029bd4e",                                                                                                        
              "5fca553707dcab1c4c9a5730",                                                                                                        
              "5fca56ca07dcab1c4c9a5731",                                                                                                        
            ],                                                                                                                                   
            "points": 0,                                                                                                                         
            "username": "belen123",                                                                                                              
            "name": "Belen",                                                                                                                     
            "lastname": "Esteban",                                                                                                               
            "email": "belen@gmail.com",                                                                                                          
            "password": "$2a$12$xiT1ZHnB2xw59Pb4o3bsqub1WinO7Edi95djW6aBn/Ug0hXbPAwUu",                                                          
            "description": "por mi hija ma to !",                                                                                                
            "createdAt": "1647486627429",                                                                                                        
          },                                                                                                                                     
          "cursor": {                                                                                                                     
            "_id": "5fd8d482c8703e0024444a0b",                                                                                                   
            "createdAt": "1647486627429",                                                                                                        
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
            "_id": "5ff5c449739e43002419290b",                                                                                                   
            "img_path": "/img/user/josedrilo.jpg",                                                                                               
            "cart": [                                                                                                                      
              "5fca3ec6b44c792fe029bd4a",                                                                                                        
              "5fca4f7607dcab1c4c9a572f",                                                                                                        
            ],                                                                                                                                   
            "items": [],                                                                                                                   
            "points": 0,                                                                                                                         
            "username": "josedrilo",                                                                                                             
            "name": "jose",                                                                                                                      
            "lastname": "gamboa",                                                                                                                
            "email": "jose@gamboa.com",                                                                                                          
            "password": "$2a$12$wZugwWuMLuvo3NSVE4QyAuPsfz.F.iDDesUrHI8FoRhHL5q4rBiNS",                                                          
            "description": "Lo más importante y único que se tiene es el tiempo, y recuerda que todo está en la mente.",                         
            "createdAt": "1647486627429",                                                                                                        
          },
          "cursor": {                                                                                                                     
            "_id": "5ff5c449739e43002419290b",                                                                                                   
            "createdAt": "1647486627429",                                                                                                        
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
        },                                                                                                                                       
        {                                                                                                                                 
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
          _id: "5fcfcd9961c30f238871f842",                                                                                                     
          createdAt: "1647486627429", 
        },
        endCursor: {
          _id: "60055bf2662ba10024867347",                                                                                                     
          createdAt: "1647486627428", 
        }
      }
    }
  } })
})
