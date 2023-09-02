import mongoose, { Schema, Document } from "mongoose";

interface ITask extends Document {
  title: string;
  description: string;
  isCompleted: boolean;
}

const TaskSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<ITask>("Task", TaskSchema);
