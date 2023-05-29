import Conection from '../../models/Conection.js'
import Message from '../../models/Message.js'

export default async function deleteOne(req,res,next){
    try{
        let conection1 = await Conection.findOneAndDelete({user_id1: req.user.id, user_id2: req.params.id})
        let conection2 = await Conection.findOneAndDelete({user_id2: req.user.id, user_id1: req.params.id})

        await Message.deleteMany({receiver: req.user.id, sender: req.params.id})
        await Message.deleteMany({receiver: req.params.id, sender: req.user.id})

        if(conection1 || conection2){
            return res.status(201).json({
                success: true,
                message: 'Friend Deleted!'
            })
        }
        return res.status(404).json({
            success: false,
            message: 'Friend Not Found!'
        })
        
    }catch(err){
        next(err)
    }
}