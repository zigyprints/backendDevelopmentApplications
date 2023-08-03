const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    tokenId:String
})

module.exports = mongoose.model('User',userSchema)