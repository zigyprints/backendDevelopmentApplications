import { todo } from "../interfaces/interface";
import mongoose from "mongoose";
const todoSchema = new mongoose.Schema<todo>({
  task: {
    type: String,
  },
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
export const ToDo = mongoose.model<todo>("todo", todoSchema);
