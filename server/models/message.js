import { model, Schema } from 'mongoose';
const messageSchema = new Schema({
    by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text: String,
    photos: [] , 

}, { timestamps: true }); 

export default model('Message', messageSchema);