import mongoose, { Document } from 'mongoose';
export interface ITask extends Document {
    title: string;
    description: string;
    completed: boolean;
}

const taskSchema = new mongoose.Schema({
    title: {
         type: String,
         required: true 
        },
    description: 
    { 
        type: String, 
        required: true 
    },
    completed: { 
        type: Boolean, 
        default: false 
    },
});

export default mongoose.model<ITask>('Task', taskSchema);
