import express from 'express'
import controller from '../controllers/users/auth.js';
import validator from '../middlewares/validator.js'
import sign_up_schema from '../schemas/sign_up.js'
import sign_in_schema from '../schemas/sign_in.js'
import get_all from '../controllers/users/get_all.js'

import accountExistsSignUp from '../middlewares/users/accountExistsSignUp.js'
import accountExistsSignIn from '../middlewares/users/accountExistsSignIn.js'
import accountHasBeenVerified from '../middlewares/users/accountHasBeenVerified.js'
import passwordIsOk from '../middlewares/users/passwordIsOk.js'
import passport from '../middlewares/passport.js'

const { sign_up, sign_in, sign_out, sign_in_token } = controller

let router = express.Router();

router.post('/signup', validator(sign_up_schema), accountExistsSignUp, sign_up);
router.post('/signin', validator(sign_in_schema), accountExistsSignIn,accountHasBeenVerified, passwordIsOk, sign_in);
router.post('/signout', passport.authenticate('jwt',{session:false}), sign_out)
router.get('/', get_all)

export default router