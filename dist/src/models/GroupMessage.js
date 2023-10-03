import mongoose, { Schema } from 'mongoose';
const groupMessageSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true,
    },
    data: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});
const Message = mongoose.model('GroupMessage', groupMessageSchema);
export default Message;
//# sourceMappingURL=GroupMessage.js.map