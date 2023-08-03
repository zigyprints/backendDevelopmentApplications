const mongoose=require('mongoose')

const schema= new mongoose.Schema({
    emailId:String,
    title: String,
    description: String,
    tid: String,
    date: Date,
})

module.exports=mongoose.model('Task',schema);