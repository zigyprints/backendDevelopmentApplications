import mongoose, { Document, Schema, Model } from 'mongoose';

interface IGroupMessage extends Document {
  sender: mongoose.Types.ObjectId;   
  group: mongoose.Types.ObjectId; 
  data: string;
  created_at: Date;
}

const groupMessageSchema: Schema<IGroupMessage> = new Schema({
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

const Message: Model<IGroupMessage> = mongoose.model<IGroupMessage>('GroupMessage', groupMessageSchema);

export default Message;
