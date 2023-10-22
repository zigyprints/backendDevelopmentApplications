import {Schema, model } from 'mongoose'; 

const date = new Date().toLocaleString('en-IN');

const userSchema = Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    phone: {
        type: String,
    },
    location:{
        type:String, 
    }, 
    email: {
        type: String,
    },
    profileImage: {
        type: String,
        default: '',
    },
    coverImage: {
        type: String,
        default: '',
    },
    status: {
        type: String,
        default: '',
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
}, { timestamps: true, });

export default model('User', userSchema);