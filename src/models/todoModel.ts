import mongoose, { Schema } from 'mongoose'
import MyTodo from '../utils/schemaType';

//schema for managing all our data structure that is going to be stored in the database
const todoschema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true
    }
}, { timestamps: true })

//here the type of the schema is MyTodo
const todomodel = mongoose.model<MyTodo>('todotask', todoschema);
export default todomodel