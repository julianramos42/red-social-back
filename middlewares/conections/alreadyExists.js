import Conection from '../../models/Conection.js'

async function alreadyExists(req,res,next) {
    const conection1 = await Conection.findOne({user_id1: req.body.user_id1, user_id2: req.body.user_id2})
    const conection2 = await Conection.findOne({user_id1: req.body.user_id2, user_id2: req.body.user_id1})
    if (conection1 || conection2) {
        return res.status(400).json({
            succes:false,
            message:'Already added!'})
    }
    return next()
}

export default alreadyExists
