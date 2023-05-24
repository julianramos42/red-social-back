import Conection from '../../models/Conection.js'

export default async function create(req,res,next){
    try{
        await Conection.create(req.body)
        return res.status(201).json({
            success: true,
            message: 'Friend Added!'
        })
    }catch(err){
        next(err)
    }
}