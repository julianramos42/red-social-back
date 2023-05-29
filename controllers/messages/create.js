import Message from '../../models/Message.js'

export default async function create(req,res,next){
    try{
        await Message.create(req.body)
        return res.status(201).json({
            success: true,
            message: 'Message Sended!'
        })
    }catch(err){
        next(err)
    }
}