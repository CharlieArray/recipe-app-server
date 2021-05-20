require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require('./config');
const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')
const shoppinglistRouter = require('./shoppinglist/shoppinglist-router')

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/shoppinglist', shoppinglistRouter)

app.get('/', (req,res,next) =>{
    res.status(200).send("Server is live")
})

app.use(function errorHandler(error, req, res, next) {
  let response;
  console.error(error);
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
