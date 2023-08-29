import mongoose from "mongoose"
import Task from "./types"

// user schema ....
const userSchema = new mongoose.Schema<Task>({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
})

export default mongoose.model<Task>('model', userSchema)