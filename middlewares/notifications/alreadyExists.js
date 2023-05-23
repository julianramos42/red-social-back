import Notification from '../../models/Notification.js'

async function alreadyExists(req,res,next) {
    const notification1 = await Notification.findOne({user_id1: req.body.user_id1, user_id2: req.body.user_id2})
    const notification2 = await Notification.findOne({user_id1: req.body.user_id2, user_id2: req.body.user_id1})
    if (notification1 || notification2) {
        return res.status(400).json({
            succes:false,
            message:'Already requested!'})
    }
    return next()
}

export default alreadyExists
