import Message from '../../models/Message.js'

export default async function get_me(req,res,next){
    try{
        let messages1 = await Message.find({receiver: req.user.id, sender: req.params.id})
        let messages2 = await Message.find({sender: req.user.id, receiver: req.params.id})
        let messages = messages1.concat(messages2)

        messages.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateA - dateB;
          });

        if(messages){
            return res.status(200).json({
                success: true,
                messages
            })
        }
        return res.status(404).json({
            success: false,
            message: 'No messages yet'
        })
    }catch(err){
        next(err)
    }
}