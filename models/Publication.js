import mongoose from 'mongoose'

const schema = new mongoose.Schema(
    {
        text: {type: String, required: true},
        user_id: { type: mongoose.Types.ObjectId, ref: 'users', required: true }
    },{
        timestamps: true
    }
)
const Publication = mongoose.model('publications',schema)
export default Publication