const mongoose = require('mongoose')

// Schema for the database
const TaskSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'must provide name'],
        trim: true,
        maxlength: [20, 'name cannot be more than 20 characters']
    },
    completed:{
        type: Boolean,
        default: false
    }
})

mongoose.set('strictQuery', true)

module.exports = mongoose.model('Task', TaskSchema)