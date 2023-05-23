import Notification from '../../models/Notification.js'

export default async function get_all(req,res,next){
    try{
        let notifications1 = await Notification.find({user_id1: req.user.id})
        let notifications2 = await Notification.find({user_id2: req.user.id})
        let notifications = notifications1.concat(notifications2)
        
        if(notifications){
            return res.status(200).json({
                success: true,
                notifications
            })
        }
        return res.status(404).json({
            success: false,
            message: 'No notifications found'
        })
    }catch(err){
        next(err)
    }
}