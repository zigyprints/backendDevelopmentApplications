import mongoose, { Schema } from 'mongoose';
const groupChatSchema = new Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'GroupMe',
        },
    ],
    created_at: {
        type: Date,
        default: Date.now,
    },
});
const Chat = mongoose.model('GroupChat', groupChatSchema);
export default Chat;
//# sourceMappingURL=GroupChat.js.map