import mongoose, { Document, Schema, Model } from 'mongoose';

interface IGroupChat extends Document {
  participants: mongoose.Types.ObjectId[];
  messages: mongoose.Types.ObjectId[];
  created_at: Date;
}

const groupChatSchema: Schema<IGroupChat> = new Schema({
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

const Chat: Model<IGroupChat> = mongoose.model<IGroupChat>('GroupChat', groupChatSchema);

export default Chat;
