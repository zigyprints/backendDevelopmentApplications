import mongoose from 'mongoose';
import { ITodo } from '../interfaces';

const todoSchema = new mongoose.Schema<ITodo>({
    name : {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String, 
        required: false,
        unique: false
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    isCompleted:  {
        type: Boolean,
        required: true,
        default: false
    }
})

const ToDoModel = mongoose.model<ITodo>("To-Do", todoSchema);

export default ToDoModel;