import Conection from '../../models/Conection.js'

export default async function get_all(req,res,next){
    try{
        let conections1 = await Conection.find({user_id1: req.user.id}).populate('user_id1 user_id2')
        let conections2 = await Conection.find({user_id2: req.user.id}).populate('user_id1 user_id2')
        let conections = conections1.concat(conections2)
        
        if(conections){
            return res.status(200).json({
                success: true,
                conections
            })
        }
        return res.status(404).json({
            success: false,
            message: 'No conections found'
        })
    }catch(err){
        next(err)
    }
}