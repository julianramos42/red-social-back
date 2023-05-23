import User from '../../models/User.js'

export default async function get_all(req, res, next) {
    try {
        let filter = {}
        if (req.query.name) {
            filter.name = new RegExp(req.query.name.trim(), "i");
        }
        
        let users = await User.find(filter).select('name last_name photo')
        if (users) {
            return res.status(200).json({
                success: true,
                users
            })
        }
        return res.status(404).json({
            success: false,
            message: 'No users found'
        })
    } catch (err) {
        next(err)
    }
}