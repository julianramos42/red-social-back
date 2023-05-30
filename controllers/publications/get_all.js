import Publication from '../../models/Publication.js'
import Conection from '../../models/Conection.js'

export default async function get_all(req,res,next){
    try{
        let conections1 = await Conection.find({user_id1: req.user.id}).populate('user_id1 user_id2')
        let conections2 = await Conection.find({user_id2: req.user.id}).populate('user_id1 user_id2')
        let conections = conections1.concat(conections2)

        let ids = conections.map(connection => [connection.user_id1._id, connection.user_id2._id]).flat();
        let uniqueIds = [...new Set(ids)]
        
        let publications = ''
        let cantPublications = ''

        let pagination = { page: 1, limit: 10}
        if (req.query.page) {
            pagination.page = Number(req.query.page)
        }

        if(uniqueIds.length){
            publications = await Publication.find({user_id: {$in: uniqueIds}})
            .sort({createdAt: -1})
            .limit(pagination.limit > 0 ? pagination.limit*pagination.page : 0)
            .populate('user_id', 'name last_name photo')

            cantPublications = await Publication.countDocuments({user_id: {$in: uniqueIds}})
        }else{
            publications = await Publication.find({user_id: req.user.id})
            .sort({createdAt: -1})
            .populate('user_id', 'name last_name photo')

            cantPublications = await Publication.countDocuments({user_id: req.user.id})
        }
        
        if(publications){
            return res.status(200).json({
                success: true,
                publications,
                cantPublications
            })
        }
        return res.status(404).json({
            success: false,
            message: 'No posts found'
        })
    }catch(err){
        next(err)
    }
}