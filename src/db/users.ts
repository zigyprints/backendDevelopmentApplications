import mongoose from "mongoose"
const todoSchema =  new mongoose.Schema({
    heading: {type: String, required: true},
    content: {type: String}
})
export const todoModel = mongoose.model('todo', todoSchema)