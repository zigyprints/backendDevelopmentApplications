import mongoose, { Schema } from 'mongoose';
const chatSchema = new Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
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