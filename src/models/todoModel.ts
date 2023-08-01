import mongoose from "mongoose";

export interface itodo {
  title: string;
  description: string;
  status: string;
}

const todoSchema = new mongoose.Schema<itodo>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["completed", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const TodoModel = mongoose.model<itodo>("Todo", todoSchema);

export default TodoModel;
