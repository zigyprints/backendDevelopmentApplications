import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  
  title: string;
  description: string;
  status: string;
  dueDate: string;  
}

const taskSchema: Schema = new Schema({
  
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, required: true },
  dueDate: { type: String, required: true },
});

export default mongoose.model<ITask>('Task', taskSchema);
