import express from 'express'
import passport from '../middlewares/passport.js'
import create from '../controllers/notifications/create.js'
import get_all from '../controllers/notifications/get_all.js'
import alreadyExists from '../middlewares/notifications/alreadyExists.js'
import get_me from '../controllers/notifications/get_me.js'
import deleteOne from '../controllers/notifications/deleteOne.js'

let router = express.Router();

router.post('/', passport.authenticate('jwt',{session:false}), alreadyExists, create)
router.get('/', passport.authenticate('jwt',{session:false}), get_all)
router.get('/me', passport.authenticate('jwt',{session:false}), get_me)
router.delete('/:id', passport.authenticate('jwt',{session:false}), deleteOne)


export default router