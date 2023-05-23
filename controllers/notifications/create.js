import Notification from '../../models/Notification.js'

export default async function create(req,res,next){
    try{
        await Notification.create(req.body)
        return res.status(201).json({
            success: true,
            message: 'Request Sended!'
        })
    }catch(err){
        next(err)
    }
}