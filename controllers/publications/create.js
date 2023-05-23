import Publication from '../../models/Publication.js'

export default async function create(req,res,next){
    try{
        req.body.user_id = req.user.id
        await Publication.create(req.body)
        return res.status(201).json({
            success: true,
            message: 'Publication Posted!'
        })
    }catch{
        next(err)
    }
}