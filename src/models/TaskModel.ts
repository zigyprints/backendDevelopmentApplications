import mongoose, { Document, Schema } from 'mongoose';

export interface ITask {
    name: String;
}

export interface ITaskModel extends ITask, Document {}

const TaskSchema: Schema = new Schema(
    {
        name: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<ITaskModel>('Task', TaskSchema);
