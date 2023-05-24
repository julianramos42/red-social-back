import Notification from '../../models/Notification.js'

export default async function deleteOne(req,res,next){
    try{
        let notification = await Notification.findOneAndDelete({_id: req.params.id})
        
        if(notification){
            return res.status(200).json({
                success: true,
                message: 'Notification Deleted'
            })
        }
        return res.status(404).json({
            success: false,
            message: 'No notification found'
        })
    }catch(err){
        next(err)
    }
}