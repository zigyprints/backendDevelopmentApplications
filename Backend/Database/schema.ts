import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        trime: true
    }
})

export default mongoose.model('model', userSchema)