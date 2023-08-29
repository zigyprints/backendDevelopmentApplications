import mongoose from "mongoose";

// interface to follow a specific pattern for all tasks ...
interface Task extends mongoose.Document {
    title: string,
    completed: boolean
}

export default Task