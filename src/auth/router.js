'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('./users-model.js');
const auth = require('./middleware.js');

authRouter.get('/', (req, res) => {
  res.send('You made it!');
});

authRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then( (user) => {
      req.token = user.generateToken();
      req.user = user;
      res.set('token', req.token);
      res.cookie('auth', req.token);
      res.send(req.token);
      console.log(req.token);
    }).catch(next);
});

authRouter.get('/signin', auth, (req, res, next) => {
  console.log('hello');
  res.cookie('auth', req.token);
  res.send(req.token);
});

module.exports = authRouter;
