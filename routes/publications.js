import express from 'express'
import validator from '../middlewares/validator.js'
import schema from '../schemas/publication.js'
import create from '../controllers/publications/create.js'
import get_all from '../controllers/publications/get_all.js'
import deleteOne from '../controllers/publications/deleteOne.js'
import passport from '../middlewares/passport.js'

let router = express.Router();

router.post('/',passport.authenticate('jwt',{session:false}), validator(schema), create)
router.get('/',passport.authenticate('jwt',{session:false}), get_all )
router.delete('/:id', passport.authenticate('jwt',{session:false}), deleteOne)

export default router