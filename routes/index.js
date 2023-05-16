import express from 'express'
import usersRouter from './users.js'

let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', usersRouter)

export default router