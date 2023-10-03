import mongoose, { Schema } from 'mongoose';
const chatSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            maxLength: 2
        },
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
        },
    ],
    created_at: {
        type: Date,
        default: Date.now,
    },
});
const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
//# sourceMappingURL=Chat.js.map