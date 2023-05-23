import Publication from '../../models/Publication.js'

export default async function deleteOne(req,res,next){
    try{
        let publication = await Publication.findOneAndDelete({_id: req.params.id, user_id: req.user.id})
        if(publication){
            return res.status(200).json({
                success: true,
                message: 'Publication Deleted!'
            })
        }
        return res.status(404).json({
            success: false,
            message: 'No post found'
        })
    }catch(err){
        next(err)
    }
}