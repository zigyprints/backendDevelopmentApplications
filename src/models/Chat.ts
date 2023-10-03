import mongoose, { Document, Schema, Model } from "mongoose";

interface IChat extends Document {
  author: mongoose.Types.ObjectId;
  participants: mongoose.Types.ObjectId[];
  messages: mongoose.Types.ObjectId[];
  created_at: Date;
}

const chatSchema: Schema<IChat> = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Chat: Model<IChat> = mongoose.model<IChat>("Chat", chatSchema);

export default Chat;
