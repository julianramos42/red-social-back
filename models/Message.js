import mongoose from 'mongoose'

const schema = new mongoose.Schema(
    {
        text: {type: String, required: true},
        receiver: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
        sender: { type: mongoose.Types.ObjectId, ref: 'users', required: true }
    },{
        timestamps: true
    }
)
const Message = mongoose.model('messages',schema)
export default Message