import Conection from '../../models/Conection.js'
import User from '../../models/User.js'

export default async function get_all(req, res, next) {
    try {
        let name = ''
        if (req.query.name) {
            name = req.query.name.trim();
        }

        let conections1 = await Conection.find({ user_id1: req.user.id }).populate('user_id1 user_id2')
        let conections2 = await Conection.find({ user_id2: req.user.id }).populate('user_id1 user_id2')
        let conections = conections1.concat(conections2)

        for (let i = 0; i < conections.length; i++) {
            const conection = conections[i];
            let aux = {}
            if (conection.user_id1._id == req.user.id) {
                aux = conection.user_id1
                conection.user_id1 = conection.user_id2;
                conection.user_id2 = aux
            }
        }

        let filteredConections = conections.filter(conection => conection.user_id1.name.toLowerCase().includes(name.toLowerCase()))

        if (conections) {
            return res.status(200).json({
                success: true,
                conections: filteredConections
            })
        }
        return res.status(404).json({
            success: false,
            message: 'No conections found'
        })
    } catch (err) {
        next(err)
    }
}