import mongoose from 'mongoose'

const schema = new mongoose.Schema(
    {
        user_id1: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
        user_id2: { type: mongoose.Types.ObjectId, ref: 'users', required: true }
    },{
        timestamps: true
    }
)
const Conection = mongoose.model('conections',schema)
export default Conection