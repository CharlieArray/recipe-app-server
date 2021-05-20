const express = require("express");

const bodyParser = express.json();
const request = require("request");
const ShoppinglistService = require("./shoppinglist-service");
const shoppinglistRouter = express.Router();
const { requireAuth } = require("../middleware/jwt-auth");

/*  HTTP Methods to retrieve shopping list entries from database */

//GET ALL shopping list entries from user in DB (path: /shoppinglist/)
shoppinglistRouter.get("/", requireAuth, (req, res, next) => {
  const knexInstance = req.app.get("db");

  ShoppinglistService.getAllItems(knexInstance, req.user.id)
    .then((data) => {
      res.status(200);
      res.json(data);
    })
    .catch(next);
});

//ADD NEW ITEM to DB for User (path: /)
shoppinglistRouter.post("/", bodyParser, requireAuth, (req, res, next) => {
  const { item } = req.body;

  const knexInstance = req.app.get("db");
  ShoppinglistService.addItem(knexInstance, { item, users_id: req.user.id })
    .then(({ item }) => {
      res.status(201);
      res.json({ item });
    })
    .catch(next);
});

//DELETE ITEM from DB for User (path: /shoppinglist/list/:id)
shoppinglistRouter.delete("/:id", requireAuth, (req, res, next) => {
  //id is unique id to that stock
  const { id } = req.params;
  const knexInstance = req.app.get("db");
  ShoppinglistService.deleteItem(knexInstance, id)
    .then((data) => {
      res.status(204).end();
    })
    .catch(next);
});

module.exports = shoppinglistRouter;
