import express from 'express'
import passport from '../middlewares/passport.js'
import create from '../controllers/notifications/create.js'
import get_all from '../controllers/notifications/get_all.js'
import alreadyExists from '../middlewares/notifications/alreadyExists.js'

let router = express.Router();

router.post('/', passport.authenticate('jwt',{session:false}), alreadyExists, create)
router.get('/', passport.authenticate('jwt',{session:false}), get_all)

export default router