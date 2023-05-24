import Notification from '../../models/Notification.js'

export default async function get_me(req,res,next){
    try{
        let notifications = await Notification.find({user_id2: req.user.id}).populate('user_id1')
        
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