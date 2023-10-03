import mongoose, { Document, Schema, Model } from 'mongoose';

interface IMessage extends Document {
  sender: mongoose.Types.ObjectId;   
  receiver: mongoose.Types.ObjectId; 
  data: string;
  created_at: Date;
}

const messageSchema: Schema<IMessage> = new Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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

const Message: Model<IMessage> = mongoose.model<IMessage>('Message', messageSchema);

export default Message;
