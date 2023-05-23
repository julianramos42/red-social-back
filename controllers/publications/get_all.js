import Publication from '../../models/Publication.js'

export default async function get_all(req,res,next){
    try{
        // cambiar para solo traer las publicaciones de amigos
        let publications = await Publication.find()
            .sort({createdAt: -1})
            .populate('user_id', 'name last_name photo')

        if(publications){
            return res.status(200).json({
                success: true,
                publications
            })
        }
        return res.status(404).json({
            success: false,
            message: 'No posts found'
        })
    }catch{
        next(err)
    }
}