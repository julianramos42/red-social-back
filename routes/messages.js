import express from 'express'
import passport from '../middlewares/passport.js'
import create from '../controllers/messages/create.js'
import get_me from '../controllers/messages/get_me.js';

let router = express.Router();

router.post('/', passport.authenticate('jwt',{session:false}), create)
router.get('/:id', passport.authenticate('jwt',{session:false}), get_me)

export default router