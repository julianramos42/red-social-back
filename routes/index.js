import express from 'express'
import usersRouter from './users.js'
import publicationsRouter from './publications.js'
import notificationsRouter from './notifications.js'

let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', usersRouter)
router.use('/publications', publicationsRouter)
router.use('/notifications', notificationsRouter)

export default router