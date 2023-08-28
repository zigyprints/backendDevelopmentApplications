import { Timestamp } from "mongodb";
import { ITodo } from "../types/todo";
import { model, Schema } from "mongoose"

const todoSchema: Schema = new Schema(
    {
        name: {
            type: String,
            require: true,
        },

        description: {
            type: String,
            require: true,
        },

        status: {
            type: Boolean,
            require: true
        },
    },
    { timestamps: true}
)

export default model<ITodo>("Todo",todoSchema)