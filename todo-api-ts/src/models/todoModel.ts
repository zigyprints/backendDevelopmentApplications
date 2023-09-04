// src/models/todoModel.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ITodo extends Document {
  title: string;
  description: string;
  completed: boolean;
}

const todoSchema: Schema = new Schema({
  description: String,
  completed: Boolean,
});

export default mongoose.model<ITodo>('Todo', todoSchema);
