import mongoose from 'mongoose'

const schema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: { type: String, required: true },
        password: { type: String, required: true },
        photo: { type: String, required: false },
        is_online: { type: Boolean, required: true },
        is_admin: { type: Boolean, required: true },
        is_verified: { type: Boolean, required: true },
    },{
        timestamps: true
    }
)
const User = mongoose.model('users',schema)
export default User