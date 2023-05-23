import mongoose from 'mongoose'

const schema = new mongoose.Schema(
    {
        user_id1: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
        user_id2: { type: mongoose.Types.ObjectId, ref: 'users', required: true }
    },{
        timestamps: true
    }
)
const Notification = mongoose.model('notifications',schema)
export default Notification