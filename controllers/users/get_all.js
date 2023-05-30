import User from '../../models/User.js'

export default async function get_all(req, res, next) {
    try {
        let pagination = { page: 1, limit: 10}
        if (req.query.page) {
            pagination.page = Number(req.query.page)
        }

        let skip = pagination.page > 1 ? (pagination.page - 1) * pagination.limit : 0

        let filter = {
            _id: {$ne: req.user.id}
        }
        if (req.query.name) {
            filter.name = new RegExp(req.query.name.trim(), "i");
            pagination.limit = 10
        }

        let users = await User.find(filter)
            .limit(pagination.limit > 0 ? pagination.limit : 0)
            .skip(skip)
            .select('name last_name photo')
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