import express from 'express'
import passport from '../middlewares/passport.js'
import create from '../controllers/conections/create.js'
import alreadyExists from '../middlewares/conections/alreadyExists.js'
import get_all from '../controllers/conections/get_all.js'
import deleteOne from '../controllers/conections/deleteOne.js'

let router = express.Router();

router.post('/', passport.authenticate('jwt',{session:false}), alreadyExists, create)
router.get('/', passport.authenticate('jwt',{session:false}), get_all)
router.delete('/:id', passport.authenticate('jwt',{session:false}), deleteOne)

export default router