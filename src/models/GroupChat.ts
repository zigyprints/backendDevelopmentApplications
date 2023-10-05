import mongoose, { Document, Schema, Model } from "mongoose";

export interface IGroupChat extends Document {
  author: mongoose.Schema.Types.ObjectId;
  name: string;
  participants: mongoose.Types.ObjectId[];
  messages: mongoose.Types.ObjectId[];
  created_at: Date;
}

const groupChatSchema: Schema<IGroupChat> = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GroupMe",
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const GroupChat: Model<IGroupChat> = mongoose.model<IGroupChat>(
  "GroupChat",
  groupChatSchema
);

export default GroupChat;
