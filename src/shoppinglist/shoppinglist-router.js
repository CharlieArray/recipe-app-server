const express = require('express')

const bodyParser = express.json();
const request = require('request');
const ShoppinglistService = require('./shoppinglist-service');
const shoppinglistRouter = express.Router()
const {requireAuth} = require('../middleware/jwt-auth')

/*  HTTP Methods to retrieve shopping list entries from database */

//GET ALL shopping list entries from user in DB (path: /shoppinglist/items/)
shoppinglistRouter.get('/items/', requireAuth, (req,res, next) => {
    const knexInstance = req.app.get('db')

    ShoppinglistService.getAllItems(knexInstance, req.user.id)
    .then(data =>{
      res.status(200)
      res.json(data)
    })
    .catch(next)
  })
  
  
//ADD NEW ITEM to DB for User (path: /shoppinglist/list/:symbol)
shoppinglistRouter.post('/list/:symbol', bodyParser, requireAuth, (req,res,next)=>{
  
  const {symbol} = req.params

      request(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=c05827n48v6ta8gblt40`, { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        console.log(body);
        const {symbol} = req.params;
        const data = {
          price: body.c , 
          ticker: symbol,
          users_id: req.user.id
        }
        const knexInstance = req.app.get('db')
        ShoppinglistService.addItem(knexInstance, data)
        .then((data)=>{
          res.status(201)
          res.json(data)
        })
        .catch(next);
      });
      
})
  
  
//DELETE ITEM from DB for User (path: /shoppinglist/list/:id)
shoppinglistRouter.delete( '/list/:id', requireAuth, (req,res,next)=>{
  //id is unique id to that stock
  const {id} = req.params
  const knexInstance = req.app.get('db')
  ShoppinglistService.deleteItem(knexInstance, id)
  .then((data)=>{
    res.status(204).end()
  })
  .catch(next)
})

  module.exports = shoppinglistRouter;